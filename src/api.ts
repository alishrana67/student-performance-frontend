export function getApiBaseUrl(): string {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:8000";
    }
  }
  return "https://student-performance-backend-avyq.onrender.com";
}

const TOKEN_KEY = "scoresense_auth_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // LocalStorage might be disabled in private mode
  }
}

function getAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getStoredToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// ---------------- Existing ML Prediction API (100% Backward Compatible) ----------------
export async function predictExamScore(data: Record<string, unknown>) {
  const baseUrl = getApiBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/predict`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(
      `Cannot connect to backend at ${baseUrl}. Please start your FastAPI server with 'npm run server' or 'run-backend.bat'.`,
    );
  }

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    const detail = typeof errorData.detail === "string" ? errorData.detail : "Prediction failed";
    throw new Error(detail);
  }

  return response.json();
}

// ---------------- Authentication APIs ----------------
export async function registerUser(payload: { name: string; email: string; password: string }) {
  const baseUrl = getApiBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      `Cannot connect to backend at ${baseUrl}. Please start your FastAPI backend with 'npm run server' or 'run-backend.bat'.`,
    );
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Backend endpoint not found on ${baseUrl}. Please make sure your local FastAPI backend is running on port 8000.`,
      );
    }
    const errorData = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    const detail =
      typeof errorData.detail === "string"
        ? errorData.detail
        : "Registration failed. Please check your details.";
    throw new Error(detail);
  }

  return response.json();
}

export async function loginUser(payload: { email: string; password: string }) {
  const baseUrl = getApiBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      `Cannot connect to backend at ${baseUrl}. Please start your FastAPI backend with 'npm run server' or 'run-backend.bat'.`,
    );
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Backend endpoint not found on ${baseUrl}. Please ensure your local FastAPI backend is running on port 8000.`,
      );
    }
    const errorData = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    const detail =
      typeof errorData.detail === "string" ? errorData.detail : "Invalid email or password.";
    throw new Error(detail);
  }

  return response.json();
}

export async function getCurrentUser() {
  const token = getStoredToken();
  if (!token) return null;

  const baseUrl = getApiBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/auth/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      setStoredToken(null);
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

// ---------------- Dashboard & Analytics APIs ----------------
export interface DashboardFilterParams {
  min_score?: number | null;
  max_score?: number | null;
  level?: string | null;
}

export async function fetchDashboardOverview(filters?: DashboardFilterParams) {
  const baseUrl = getApiBaseUrl();
  const params = new URLSearchParams();
  if (filters?.min_score !== undefined && filters?.min_score !== null) {
    params.append("min_score", String(filters.min_score));
  }
  if (filters?.max_score !== undefined && filters?.max_score !== null) {
    params.append("max_score", String(filters.max_score));
  }
  if (filters?.level && filters.level !== "All") {
    params.append("level", filters.level);
  }

  const qs = params.toString() ? `?${params.toString()}` : "";
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/dashboard/overview${qs}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
  } catch {
    throw new Error(`Cannot connect to backend at ${baseUrl}.`);
  }

  if (!response.ok) {
    throw new Error("Failed to load dashboard overview");
  }

  return response.json();
}

export async function fetchDashboardAnalytics(filters?: DashboardFilterParams) {
  const baseUrl = getApiBaseUrl();
  const params = new URLSearchParams();
  if (filters?.min_score !== undefined && filters?.min_score !== null) {
    params.append("min_score", String(filters.min_score));
  }
  if (filters?.max_score !== undefined && filters?.max_score !== null) {
    params.append("max_score", String(filters.max_score));
  }
  if (filters?.level && filters.level !== "All") {
    params.append("level", filters.level);
  }

  const qs = params.toString() ? `?${params.toString()}` : "";
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/dashboard/analytics${qs}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
  } catch {
    throw new Error(`Cannot connect to backend at ${baseUrl}.`);
  }

  if (!response.ok) {
    throw new Error("Failed to load dashboard analytics");
  }

  return response.json();
}

export interface HistoryFilterParams extends DashboardFilterParams {
  page?: number;
  page_size?: number;
  search?: string;
  user_only?: boolean;
}

export async function fetchPredictionHistory(params?: HistoryFilterParams) {
  const baseUrl = getApiBaseUrl();
  const qs = new URLSearchParams();
  if (params?.page) qs.append("page", String(params.page));
  if (params?.page_size) qs.append("page_size", String(params.page_size));
  if (params?.search) qs.append("search", params.search);
  if (params?.level && params.level !== "All") qs.append("level", params.level);
  if (params?.min_score !== undefined && params?.min_score !== null) {
    qs.append("min_score", String(params.min_score));
  }
  if (params?.max_score !== undefined && params?.max_score !== null) {
    qs.append("max_score", String(params.max_score));
  }
  if (params?.user_only) qs.append("user_only", "true");

  const query = qs.toString() ? `?${qs.toString()}` : "";
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/dashboard/history${query}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
  } catch {
    throw new Error(`Cannot connect to backend at ${baseUrl}.`);
  }

  if (!response.ok) {
    throw new Error("Failed to load prediction history");
  }

  return response.json();
}

export async function fetchInsights() {
  const baseUrl = getApiBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/dashboard/insights`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
  } catch {
    throw new Error(`Cannot connect to backend at ${baseUrl}.`);
  }

  if (!response.ok) {
    throw new Error("Failed to load insights");
  }

  return response.json();
}
