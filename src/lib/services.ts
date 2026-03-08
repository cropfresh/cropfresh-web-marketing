import { apiClient } from "@/lib/api-client";

// ─── Types ───────────────────────────────────────────────

export interface Listing {
  id: string;
  farmer_id: string;
  commodity: string;
  variety?: string | null;
  quantity_kg: number;
  asking_price_per_kg: number;
  suggested_price?: number | null;
  grade: string;
  cv_confidence?: number | null;
  hitl_required: boolean;
  status: string;
  adcl_tagged: boolean;
  batch_qr_code?: string | null;
  expires_at?: string | null;
  created_at?: string | null;
}

export interface PaginatedListings {
  items: Listing[];
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

export interface CreateListingPayload {
  farmer_id: string;
  commodity: string;
  variety?: string;
  quantity_kg: number;
  asking_price_per_kg?: number;
  harvest_date?: string;
  pickup_lat?: number;
  pickup_lon?: number;
  photos?: string[];
}

export interface AISPBreakdown {
  farmer_payout: number;
  logistics_cost: number;
  platform_margin: number;
  risk_buffer: number;
  aisp_total: number;
  aisp_per_kg: number;
}

export interface Order {
  id: string;
  listing_id: string;
  buyer_id: string;
  hauler_id?: string | null;
  quantity_kg: number;
  order_status: string;
  escrow_status: string;
  aisp: AISPBreakdown;
  commodity?: string | null;
  farmer_id?: string | null;
  buyer_name?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CreateOrderPayload {
  listing_id: string;
  buyer_id: string;
  quantity_kg: number;
  hauler_id?: string;
  override_price_per_kg?: number;
}

// ─── Listings API ─────────────────────────────────────────

export const listingsApi = {
  search: (params?: {
    commodity?: string;
    district?: string;
    min_grade?: string;
    max_price?: number;
    limit?: number;
    offset?: number;
  }) => apiClient.get<PaginatedListings>("/listings", { params }),

  getByFarmer: (farmer_id: string, status = "active") =>
    apiClient.get<Listing[]>(`/listings/farmer/${farmer_id}`, { params: { status } }),

  getById: (id: string) => apiClient.get<Listing>(`/listings/${id}`),

  create: (payload: CreateListingPayload) =>
    apiClient.post<Listing>("/listings", payload),

  update: (id: string, payload: { asking_price_per_kg?: number; quantity_kg?: number; status?: string }) =>
    apiClient.patch<Listing>(`/listings/${id}`, payload),

  cancel: (id: string) => apiClient.delete(`/listings/${id}`),
};

// ─── Orders API ───────────────────────────────────────────

export const ordersApi = {
  list: (params?: { farmer_id?: string; buyer_id?: string; status?: string }) =>
    apiClient.get<Order[]>("/orders", { params }),

  getById: (id: string) => apiClient.get<Order>(`/orders/${id}`),

  create: (payload: CreateOrderPayload) =>
    apiClient.post<Order>("/orders", payload),

  updateStatus: (order_id: string, status: string, metadata?: Record<string, unknown>) =>
    apiClient.patch<Order>(`/orders/${order_id}/status`, { status, metadata }),

  settle: (order_id: string) =>
    apiClient.post<Order>(`/orders/${order_id}/settle`),

  getAisp: (order_id: string) =>
    apiClient.get<AISPBreakdown>(`/orders/${order_id}/aisp`),
};

// ─── Market Data API ──────────────────────────────────────

export const dataApi = {
  getPrices: (commodity: string, state?: string, source = "agmarknet") =>
    apiClient.get("/data/prices", { params: { commodity, state, source } }),

  getWeather: (state = "Karnataka", district?: string) =>
    apiClient.get("/data/weather", { params: { state, district } }),
};

// ─── Chat API ────────────────────────────────────────────

export const chatApi = {
  createSession: (user_id?: string) =>
    apiClient.post("/chat/session", null, { params: { user_id } }),

  send: (message: string, session_id?: string, context?: Record<string, unknown>) =>
    apiClient.post("/chat", { message, session_id, context }),
};

// ─── Voice API ───────────────────────────────────────────

export const voiceApi = {
  process: (audioBlob: Blob, user_id: string, session_id?: string, language = "auto") => {
    const form = new FormData();
    form.append("audio", audioBlob, "recording.webm");
    form.append("user_id", user_id);
    if (session_id) form.append("session_id", session_id);
    form.append("language", language);
    return apiClient.post("/voice/process", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  transcribe: (audioBlob: Blob, language = "auto") => {
    const form = new FormData();
    form.append("audio", audioBlob, "recording.webm");
    form.append("language", language);
    return apiClient.post("/voice/transcribe", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
