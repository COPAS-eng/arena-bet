const BASE = "/api";

async function api(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "API error" }));
    throw new Error(err.error || "API error");
  }
  return res.json();
}

export const authApi = {
  login: (email: string, password: string) => api("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }),
  logout: () => api("/auth/signout", { method: "POST" }),
  getSession: () => api("/auth/session"),
};

export const userApi = {
  getProfile: () => api("/user"),
};

export const walletApi = {
  deposit: (amount: number) => api("/wallet", {
    method: "POST",
    body: JSON.stringify({ type: "DEPOSIT", amount }),
  }),
  withdraw: (amount: number) => api("/wallet", {
    method: "POST",
    body: JSON.stringify({ type: "WITHDRAW", amount }),
  }),
};

export const transactionApi = {
  getHistory: (params: Record<string,string> = {}) => {
    const query = new URLSearchParams(params).toString();
    return api(`/transactions?${query}`);
  },
};
