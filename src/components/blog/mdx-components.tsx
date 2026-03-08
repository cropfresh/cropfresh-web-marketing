import Image from "next/image";

export const mdxComponents = {
    h2: (props: any) => (
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="text-xl font-semibold text-green-400 mt-8 mb-3" {...props} />
    ),
    p: (props: any) => (
        <p className="text-slate-300 leading-relaxed mb-4" {...props} />
    ),
    ul: (props: any) => (
        <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1" {...props} />
    ),
    ol: (props: any) => (
        <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-1" {...props} />
    ),
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-green-400 pl-4 italic text-slate-400 my-6 bg-white/5 py-3 rounded-r-lg" {...props} />
    ),
    code: (props: any) => (
        <code className="bg-slate-800 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
    ),
    img: ({ src, alt, ...props }: any) => (
        <Image src={src} alt={alt || ""} width={800} height={450} className="rounded-xl my-6 w-full object-cover shadow-lg border border-white/10" {...props} />
    ),
};
