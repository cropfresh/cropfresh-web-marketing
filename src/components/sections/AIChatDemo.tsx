"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    Mic, MicOff, Send, Volume2, VolumeX,
    Loader2, MessageCircle, Globe, User, Bot,
    AlertCircle, Activity, Keyboard,
} from "lucide-react";

// ─── Config ──────────────────────────────────────────────────────────────────
const AI_API_URL =
    process.env.NEXT_PUBLIC_AI_API_URL ?? "http://localhost:8080";

const WS_URL = AI_API_URL
    .replace(/^https/, "wss")
    .replace(/^http/, "ws");

// ─── Types ────────────────────────────────────────────────────────────────────
type Language = "kn" | "hi" | "te" | "ta" | "en";
type InputMode = "voice" | "text";

interface Message {
    id: string;
    role: "user" | "assistant";
    text: string;
    intent?: string;
    entities?: Record<string, string>;
    confidence?: number;
    isLoading?: boolean;
    isStreaming?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LANGUAGES: { code: Language; label: string; native: string }[] = [
    { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
    { code: "hi", label: "Hindi", native: "हिंदी" },
    { code: "te", label: "Telugu", native: "తెలుగు" },
    { code: "ta", label: "Tamil", native: "தமிழ்" },
    { code: "en", label: "English", native: "English" },
];

const EXAMPLE_PROMPTS = [
    { lang: "kn", text: "ನನ್ನ ಹತ್ತಿರ ೫೦ ಕೆಜಿ ಟೊಮಾಟೊ ಇದೆ", label: "ಕನ್ನಡ" },
    { lang: "en", text: "I have 30 kg of onions to sell", label: "English" },
    { lang: "hi", text: "मेरे पास 20 किलो आलू है", label: "हिंदी" },
];

const REST_FALLBACK_MSG = {
    intent: "create_listing",
    entities: { commodity: "tomato", quantity: "50 kg" },
    response_text: "I've noted your listing. Our AI will find you the best buyer match at a fair price.",
    confidence: 0.94,
};

// ─── Waveform Bars ────────────────────────────────────────────────────────────
function WaveformBars({ active }: { active: boolean }) {
    return (
        <div className="flex items-center gap-[3px] h-5">
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-red-400"
                    animate={active
                        ? { height: ["4px", "16px", "4px"] }
                        : { height: "4px" }}
                    transition={active
                        ? { duration: 0.5, repeat: Infinity, delay: i * 0.1 }
                        : {}}
                />
            ))}
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function AIChatDemo() {
    const [messages, setMessages] = useState<Message[]>([{
        id: "welcome",
        role: "assistant",
        text: "Namaste! I'm the CropFresh AI — speak or type in any Indian language to get started.",
    }]);
    const [inputMode, setInputMode] = useState<InputMode>("voice");
    const [inputText, setInputText] = useState("");
    const [selectedLang, setSelectedLang] = useState<Language>("kn");
    const [isRecording, setIsRecording] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [muted, setMuted] = useState(false);
    const [wsStatus, setWsStatus] = useState<"idle" | "connected" | "error">("idle");
    const [apiError, setApiError] = useState<string | null>(null);

    // Refs
    const wsRef = useRef<WebSocket | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const userIdRef = useRef(`web-${Math.random().toString(36).slice(2, 9)}`);
    const pendingUserMsgId = useRef<string | null>(null);
    const pendingAsstMsgId = useRef<string | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Clean up on unmount
    useEffect(() => () => { closeWS(); }, []);

    // ── Helpers ──────────────────────────────────────────────────────────────
    const addMsg = useCallback((msg: Omit<Message, "id">): string => {
        const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
        setMessages(prev => [...prev, { id, ...msg }]);
        return id;
    }, []);

    const updateMsg = useCallback((id: string, patch: Partial<Message>) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, ...patch } : m));
    }, []);

    const playBase64Audio = useCallback(async (b64: string) => {
        if (muted) return;
        try {
            if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
                audioCtxRef.current = new AudioContext();
            }
            const ctx = audioCtxRef.current;
            const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
            const buf = await ctx.decodeAudioData(bytes.buffer);
            const src = ctx.createBufferSource();
            src.buffer = buf;
            src.connect(ctx.destination);
            src.start();
        } catch { /* ignore decode errors */ }
    }, [muted]);

    // ── WebSocket management ──────────────────────────────────────────────────
    const openWS = useCallback((): Promise<WebSocket> => {
        return new Promise((resolve, reject) => {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                resolve(wsRef.current);
                return;
            }
            const ws = new WebSocket(`${WS_URL}/ws/voice/${userIdRef.current}`);
            wsRef.current = ws;

            ws.onopen = () => {
                setWsStatus("connected");
                // Send config as first message
                ws.send(JSON.stringify({ type: "config", language: selectedLang }));
                resolve(ws);
            };

            ws.onerror = () => {
                setWsStatus("error");
                reject(new Error("WebSocket connection failed"));
            };

            ws.onclose = () => setWsStatus("idle");

            ws.onmessage = (ev) => {
                try {
                    const msg = JSON.parse(ev.data);
                    handleWsMessage(msg);
                } catch { /* malformed frame */ }
            };
        });
    }, [selectedLang]); // eslint-disable-line

    const closeWS = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: "end" }));
            wsRef.current.close();
        }
        wsRef.current = null;
    };

    const handleWsMessage = useCallback((msg: Record<string, unknown>) => {
        switch (msg.type) {
            case "config_ack":
                break;

            case "transcription": {
                // Update user bubble with real transcript
                if (pendingUserMsgId.current && msg.is_final) {
                    updateMsg(pendingUserMsgId.current, { text: String(msg.text ?? "…") });
                    pendingUserMsgId.current = null;
                }
                break;
            }

            case "response": {
                // Create or update assistant bubble
                if (pendingAsstMsgId.current) {
                    updateMsg(pendingAsstMsgId.current, {
                        text: String(msg.text ?? ""),
                        intent: String(msg.intent ?? ""),
                        entities: msg.entities as Record<string, string> | undefined,
                        isLoading: false,
                        isStreaming: false,
                    });
                    pendingAsstMsgId.current = null;
                } else {
                    addMsg({
                        role: "assistant",
                        text: String(msg.text ?? ""),
                        intent: String(msg.intent ?? ""),
                        entities: msg.entities as Record<string, string> | undefined,
                    });
                }
                setIsSending(false);
                break;
            }

            case "audio": {
                if (msg.audio_base64) {
                    playBase64Audio(String(msg.audio_base64));
                }
                break;
            }

            case "error": {
                setApiError(String(msg.text ?? "Voice processing error"));
                setIsSending(false);
                break;
            }
        }
    }, [updateMsg, addMsg, playBase64Audio]);

    // ── Voice recording (duplex) ──────────────────────────────────────────────
    const startDuplexVoice = async () => {
        setApiError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // Open WS (or reuse existing)
            let ws: WebSocket;
            try {
                ws = await openWS();
            } catch {
                // WS unavailable → fall back to REST after recording
                startRestFallbackRecording(stream);
                return;
            }

            // Create user bubble placeholder
            const uMsgId = addMsg({ role: "user", text: "🎤 Listening…" });
            pendingUserMsgId.current = uMsgId;

            // Create assistant loading bubble
            const aMsgId = addMsg({ role: "assistant", text: "", isLoading: true });
            pendingAsstMsgId.current = aMsgId;

            setIsRecording(true);
            setIsSending(true);

            // Stream audio in 250ms chunks over WS
            const recorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
            mediaRecorderRef.current = recorder;

            recorder.ondataavailable = async (e) => {
                if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) {
                    const arrayBuf = await e.data.arrayBuffer();
                    const b64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuf)));
                    ws.send(JSON.stringify({ type: "audio", audio_base64: b64 }));
                }
            };

            recorder.start(250); // emit chunks every 250ms

        } catch {
            setApiError("Microphone access denied. Please allow mic access.");
        }
    };

    const stopDuplexVoice = () => {
        mediaRecorderRef.current?.stop();
        mediaRecorderRef.current = null;
        streamRef.current?.getTracks().forEach(t => t.stop());
        streamRef.current = null;
        setIsRecording(false);

        // Tell server to flush and process the buffer
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: "process" }));
        }
    };

    // ── REST fallback (if WS fails) ───────────────────────────────────────────
    const startRestFallbackRecording = (stream: MediaStream) => {
        const chunks: Blob[] = [];
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        setIsRecording(true);

        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = async () => {
            const blob = new Blob(chunks, { type: "audio/webm" });
            stream.getTracks().forEach(t => t.stop());
            setIsRecording(false);
            await sendAudioREST(blob);
        };
        recorder.start();
    };

    const sendAudioREST = async (blob: Blob) => {
        const uId = addMsg({ role: "user", text: "🎤 Voice message…" });
        const aId = addMsg({ role: "assistant", text: "", isLoading: true });
        setIsSending(true);

        try {
            const form = new FormData();
            form.append("audio", blob, "recording.webm");
            form.append("user_id", userIdRef.current);
            form.append("language", selectedLang);

            const res = await fetch(`${AI_API_URL}/api/v1/voice/process`, {
                method: "POST",
                body: form,
            });

            if (!res.ok) throw new Error("api_error");
            const data = await res.json();

            if (data.transcription) updateMsg(uId, { text: data.transcription });
            updateMsg(aId, {
                text: data.response_text ?? "Done.",
                intent: data.intent,
                entities: data.entities,
                confidence: data.confidence,
                isLoading: false,
            });
            if (data.response_audio_base64) playBase64Audio(data.response_audio_base64);
        } catch {
            updateMsg(aId, { ...REST_FALLBACK_MSG, isLoading: false });
            setApiError("Could not reach AI server — showing example response.");
        } finally {
            setIsSending(false);
        }
    };

    // ── Text / SSE chat ───────────────────────────────────────────────────────
    const sendTextSSE = useCallback(async (text: string) => {
        if (!text.trim() || isSending) return;
        addMsg({ role: "user", text });
        setInputText("");
        setIsSending(true);
        setApiError(null);

        const aId = addMsg({ role: "assistant", text: "", isStreaming: true });

        try {
            const res = await fetch(`${AI_API_URL}/api/v1/chat/stream`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, context: { language: selectedLang } }),
            });

            if (!res.ok || !res.body) throw new Error("stream_error");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            let fullText = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";

                for (const line of lines) {
                    if (!line.startsWith("data: ")) continue;
                    try {
                        const chunk = JSON.parse(line.slice(6));
                        if (chunk.type === "token") {
                            fullText += chunk.content;
                            updateMsg(aId, { text: fullText });
                        }
                        if (chunk.type === "done") {
                            updateMsg(aId, {
                                text: fullText,
                                confidence: chunk.confidence ?? undefined,
                                isStreaming: false,
                            });
                        }
                        if (chunk.type === "error") throw new Error(chunk.content);
                    } catch { /* malformed SSE chunk — skip */ }
                }
            }
        } catch {
            // Fallback to plain REST chat
            try {
                const res = await fetch(`${AI_API_URL}/api/v1/chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: text, context: { language: selectedLang } }),
                });
                if (!res.ok) throw new Error();
                const data = await res.json();
                updateMsg(aId, { text: data.message ?? data.response ?? "Done.", isStreaming: false });
            } catch {
                updateMsg(aId, { ...REST_FALLBACK_MSG, isStreaming: false });
                setApiError("Could not reach AI server — showing example response.");
            }
        } finally {
            setIsSending(false);
        }
    }, [isSending, selectedLang, addMsg, updateMsg]);

    const handleMic = () => {
        if (isRecording) stopDuplexVoice();
        else startDuplexVoice();
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <section id="live-voice" className="relative py-24 md:py-32 bg-black overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <Container className="relative z-10">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>

                    {/* Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
                            <Activity className="w-3.5 h-3.5" />
                            Live Voice &amp; Intelligence
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
                            Talk to{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                CropFresh AI
                            </span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-xl mx-auto">
                            Speak in Kannada, Hindi, Telugu, Tamil, or English. IndicWhisper STT → Claude intent → IndicTTS response — end-to-end in under 2 seconds.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
                        {/* Error banner */}
                        {apiError && (
                            <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 text-sm">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{apiError}</span>
                            </div>
                        )}

                        {/* Chat card */}
                        <div className="rounded-3xl border border-white/10 bg-[#0A0D14] shadow-[0_32px_64px_rgba(0,0,0,0.7)] overflow-hidden">

                            {/* Top bar */}
                            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                        <Activity className="w-4 h-4 text-black" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold leading-none">CropFresh AI</p>
                                        <p className={`text-[10px] mt-0.5 ${wsStatus === "connected" ? "text-emerald-400" : wsStatus === "error" ? "text-red-400" : "text-white/30"}`}>
                                            {wsStatus === "connected" ? "● Live Duplex Active" : wsStatus === "error" ? "● WS Error — using REST" : "● Ready"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Mode toggle */}
                                    <div className="flex items-center p-0.5 rounded-xl bg-white/5 border border-white/10">
                                        {(["voice", "text"] as InputMode[]).map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setInputMode(m)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${inputMode === m
                                                    ? "bg-white/10 text-white"
                                                    : "text-white/40 hover:text-white/70"}`}
                                            >
                                                {m === "voice" ? <Mic className="w-3 h-3" /> : <Keyboard className="w-3 h-3" />}
                                                {m === "voice" ? "Voice" : "Text"}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Language */}
                                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                                        <Globe className="w-3 h-3 text-white/40" />
                                        <select
                                            value={selectedLang}
                                            onChange={e => setSelectedLang(e.target.value as Language)}
                                            className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer"
                                        >
                                            {LANGUAGES.map(l => (
                                                <option key={l.code} value={l.code} className="bg-[#0A0D14]">{l.native}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Mute */}
                                    <button
                                        onClick={() => setMuted(!muted)}
                                        className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                                    >
                                        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Chat messages */}
                            <div className="h-80 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                                {messages.map(msg => (
                                    <AnimatePresence key={msg.id}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                                        >
                                            {/* Avatar */}
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user"
                                                ? "bg-blue-500/20 text-blue-400"
                                                : "bg-emerald-500/20 text-emerald-400"}`}>
                                                {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                                            </div>

                                            <div className={`max-w-[80%] flex flex-col gap-1.5 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                                {/* Bubble */}
                                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                    ? "bg-blue-500/15 border border-blue-500/20 text-white rounded-tr-none"
                                                    : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"}`}>
                                                    {msg.isLoading ? (
                                                        <div className="flex items-center gap-2 text-white/40">
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            <span className="text-xs">Processing…</span>
                                                        </div>
                                                    ) : (
                                                        <span>
                                                            {msg.text}
                                                            {msg.isStreaming && (
                                                                <span className="inline-block w-0.5 h-4 ml-0.5 bg-emerald-400 animate-pulse align-middle" />
                                                            )}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Intent / Entity chips */}
                                                {msg.role === "assistant" && !msg.isLoading && msg.intent && (
                                                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                                                        <span className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/20 text-violet-400 text-[10px] font-mono">
                                                            🧠 {msg.intent}
                                                        </span>
                                                        {msg.entities && Object.entries(msg.entities).map(([k, v]) => (
                                                            <span key={k} className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/20 text-blue-400 text-[10px] font-mono">
                                                                📦 {k}: {v}
                                                            </span>
                                                        ))}
                                                        {msg.confidence && (
                                                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                                                                📊 {Math.round(msg.confidence * 100)}%
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Example prompts */}
                            <div className="px-5 pb-3 flex flex-wrap gap-2">
                                {EXAMPLE_PROMPTS.map(p => (
                                    <button
                                        key={p.text}
                                        onClick={() => inputMode === "text" ? sendTextSSE(p.text) : setInputText(p.text)}
                                        disabled={isSending || isRecording}
                                        className="text-[10px] px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all disabled:opacity-30 truncate max-w-[220px]"
                                    >
                                        {p.label}: {p.text}
                                    </button>
                                ))}
                            </div>

                            {/* Input area */}
                            <div className="px-4 pb-4">
                                {inputMode === "voice" ? (
                                    /* ── Voice mode ── */
                                    <div className="flex flex-col items-center gap-3">
                                        <motion.button
                                            whileTap={{ scale: 0.93 }}
                                            onClick={handleMic}
                                            disabled={isSending && !isRecording}
                                            className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${isRecording
                                                ? "bg-red-500 shadow-[0_0_32px_rgba(239,68,68,0.5)]"
                                                : "bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.3)] hover:shadow-[0_0_36px_rgba(16,185,129,0.5)]"
                                            } disabled:opacity-30`}
                                        >
                                            {isRecording
                                                ? <MicOff className="w-6 h-6 text-white" />
                                                : <Mic className="w-6 h-6 text-black" />
                                            }
                                            {isRecording && (
                                                <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-60" />
                                            )}
                                        </motion.button>

                                        <div className="flex flex-col items-center gap-1">
                                            {isRecording
                                                ? <WaveformBars active />
                                                : null}
                                            <p className="text-white/40 text-xs">
                                                {isRecording
                                                    ? "Streaming live… tap to send"
                                                    : isSending
                                                        ? "AI is thinking…"
                                                        : "Tap to speak"}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    /* ── Text mode ── */
                                    <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10 focus-within:border-emerald-500/40 transition-colors">
                                        <input
                                            type="text"
                                            value={inputText}
                                            onChange={e => setInputText(e.target.value)}
                                            onKeyDown={e => e.key === "Enter" && sendTextSSE(inputText)}
                                            placeholder="Type your message…"
                                            disabled={isSending}
                                            className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none px-2 disabled:opacity-40"
                                        />
                                        <button
                                            onClick={() => sendTextSSE(inputText)}
                                            disabled={isSending || !inputText.trim()}
                                            className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center transition-all disabled:opacity-30"
                                        >
                                            {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tech footer badge */}
                        <p className="text-center text-white/25 text-xs mt-4">
                            IndicWhisper STT · AWS Bedrock Claude · IndicTTS · Pipecat pipeline
                        </p>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
