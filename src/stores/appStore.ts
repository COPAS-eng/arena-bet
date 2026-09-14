"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type BetItem = { id: string; event: string; market: string; odd: number };
export type Transaction = { id: string; date: string; type: "DEPOSIT" | "WITHDRAW" | "BET" | "WIN" | "BONUS"; description: string; amount: number; status: string };
export type Notification = { id: string; title: string; message: string; read: boolean; date: string };

type User = { name: string; email: string; avatar: string } | null;

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
const initialTransactions: Transaction[] = [
  { id: generateId(), date: new Date().toISOString(), type: "DEPOSIT", description: "Depósito DEMO", amount: 100, status: "Concluído" },
  { id: generateId(), date: new Date(Date.now() - 86400000).toISOString(), type: "BET", description: "Aposta - Flamengo x Palmeiras", amount: -20, status: "Concluído" },
  { id: generateId(), date: new Date(Date.now() - 172800000).toISOString(), type: "WIN", description: "Prêmio - Crash 2.54x", amount: 38, status: "Concluído" },
];
const initialNotifications: Notification[] = [
  { id: generateId(), title: "Bônus disponível", message: "Novo bônus de boas-vindas disponível!", read: false, date: new Date().toISOString() },
  { id: generateId(), title: "Depósito processado", message: "Seu depósito de R$ 100,00 foi creditado.", read: false, date: new Date().toISOString() },
  { id: generateId(), title: "Aposta encerrada", message: "Sua aposta em Crash foi finalizada.", read: true, date: new Date().toISOString() },
];

type AppState = {
  isAuthenticated: boolean;
  user: User;
  balance: number;
  bonusBalance: number;
  betItems: BetItem[];
  transactions: Transaction[];
  notifications: Notification[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addTransaction: (t: Omit<Transaction, "id" | "date">) => void;
  deposit: (amount: number) => Promise<{ success: boolean; error?: string }>;
  withdraw: (amount: number) => Promise<{ success: boolean; error?: string }>;
  placeBet: (amount: number, win: boolean, payout: number) => { success: boolean; error?: string };
  addBetItem: (item: BetItem) => void;
  removeBetItem: (id: string) => void;
  clearBetSlip: () => void;
  markAllRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "date">) => void;
  fetchProfile: () => Promise<void>;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      balance: 1000,
      bonusBalance: 250,
      betItems: [],
      transactions: initialTransactions,
      notifications: initialNotifications,
      loading: false,

      login: async (email, password) => {
        set({ loading: true });
        try {
          const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          if (res.ok) {
            const data = await res.json();
            set({ isAuthenticated: true, user: { name: data.username, email: data.email, avatar: data.username[0]?.toUpperCase() ?? "U" }, loading: false });
            await get().fetchProfile();
          } else {
            set({ loading: false });
            throw new Error("Login failed");
          }
        } catch {
          set({ loading: false });
          throw new Error("Login failed");
        }
      },
      logout: async () => {
        await fetch("/api/auth/signout", { method: "POST" });
        set({ isAuthenticated: false, user: null, betItems: [] });
      },

      addTransaction: (t) =>
        set((s) => ({
          transactions: [{ id: generateId(), date: new Date().toISOString(), ...t }, ...s.transactions],
        })),

      deposit: async (amount) => {
        if (amount <= 0) return { success: false, error: "Valor deve ser maior que zero" };
        if (amount > 100000) return { success: false, error: "Limite máximo de R$ 100.000" };
        try {
          const res = await fetch("/api/wallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "DEPOSIT", amount }),
          });
          if (res.ok) {
            const data = await res.json();
            set({ balance: data.balance });
            return { success: true };
          }
          const err = await res.json();
          return { success: false, error: err.error };
        } catch {
          return { success: false, error: "Erro de conexão" };
        }
      },

      withdraw: async (amount) => {
        if (amount <= 0) return { success: false, error: "Valor deve ser maior que zero" };
        if (amount > 50000) return { success: false, error: "Limite máximo de saque: R$ 50.000" };
        try {
          const res = await fetch("/api/wallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "WITHDRAW", amount }),
          });
          if (res.ok) {
            const data = await res.json();
            set({ balance: data.balance });
            return { success: true };
          }
          const err = await res.json();
          return { success: false, error: err.error };
        } catch {
          return { success: false, error: "Erro de conexão" };
        }
      },

      placeBet: (amount, win, payout) => {
        if (amount <= 0) return { success: false, error: "Valor da aposta inválido" };
        const state = get();
        if (state.balance < amount) return { success: false, error: "Saldo insuficiente" };
        set((s) => {
          const newBal = win ? s.balance - amount + payout : s.balance - amount;
          return {
            balance: newBal,
            transactions: [
              { id: generateId(), date: new Date().toISOString(), type: "BET", description: "Aposta esportiva", amount: -amount, status: win ? "Ganha" : "Perdida" },
              ...(win ? [{ id: generateId(), date: new Date().toISOString(), type: "WIN" as const, description: "Prêmio", amount: payout, status: "Concluído" }] : []),
              ...s.transactions,
            ],
          };
        });
        return { success: true };
      },

      addBetItem: (item) => set((s) => (s.betItems.find((b) => b.id === item.id) ? s : { betItems: [...s.betItems, item] })),
      removeBetItem: (id) => set((s) => ({ betItems: s.betItems.filter((b) => b.id !== id) })),
      clearBetSlip: () => set({ betItems: [] }),
      markAllRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
      addNotification: (notification) => set((s) => ({
        notifications: [{ id: generateId(), date: new Date().toISOString(), ...notification }, ...s.notifications],
      })),
      fetchProfile: async () => {
        try {
          const res = await fetch("/api/user");
          if (res.ok) {
            const data = await res.json();
            set({ balance: data.balance, bonusBalance: data.bonusBalance });
          }
        } catch {}
      },
    }),
    {
      name: "arena-bet-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        balance: s.balance,
        bonusBalance: s.bonusBalance,
        transactions: s.transactions,
        isAuthenticated: s.isAuthenticated,
        user: s.user,
        betItems: s.betItems,
        notifications: s.notifications,
      }),
    }
  )
);
