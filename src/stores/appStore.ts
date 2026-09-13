"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type BetItem = {
  id: string;
  event: string;
  market: string;
  odd: number;
};

export type Transaction = {
  id: string;
  date: string;
  type: "DEPOSIT" | "WITHDRAW" | "BET" | "WIN" | "BONUS";
  description: string;
  amount: number;
  status: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: string;
};

type User = {
  name: string;
  email: string;
  avatar: string;
} | null;

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
  login: (email: string, name: string) => void;
  logout: () => void;
  addTransaction: (t: Omit<Transaction, "id" | "date">) => void;
  deposit: (amount: number) => { success: boolean; error?: string };
  withdraw: (amount: number) => { success: boolean; error?: string };
  placeBet: (amount: number, win: boolean, payout: number) => { success: boolean; error?: string };
  addBetItem: (item: BetItem) => void;
  removeBetItem: (id: string) => void;
  clearBetSlip: () => void;
  markAllRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "date">) => void;
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

      login: (email, name) => set({ isAuthenticated: true, user: { name, email, avatar: name[0]?.toUpperCase() ?? "U" } }),
      logout: () => set({ isAuthenticated: false, user: null, betItems: [] }),

      addTransaction: (t) =>
        set((s) => ({
          transactions: [{ id: generateId(), date: new Date().toISOString(), ...t }, ...s.transactions],
        })),

      deposit: (amount) => {
        if (amount <= 0) return { success: false, error: "Valor deve ser maior que zero" };
        if (amount > 100000) return { success: false, error: "Limite máximo de R$ 100.000" };
        set((s) => {
          const newBal = s.balance + amount;
          return {
            balance: newBal,
            transactions: [
              { id: generateId(), date: new Date().toISOString(), type: "DEPOSIT", description: "Depósito DEMO", amount, status: "Concluído" },
              ...s.transactions,
            ],
            notifications: [
              { id: generateId(), title: "Depósito processado", message: `Depósito de ${amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} creditado.`, read: false, date: new Date().toISOString() },
              ...s.notifications,
            ],
          };
        });
        return { success: true };
      },

      withdraw: (amount) => {
        if (amount <= 0) return { success: false, error: "Valor deve ser maior que zero" };
        const state = get();
        if (state.balance < amount) return { success: false, error: "Saldo insuficiente" };
        if (amount > 50000) return { success: false, error: "Limite máximo de saque: R$ 50.000" };
        set((s) => ({
          balance: s.balance - amount,
          transactions: [
            { id: generateId(), date: new Date().toISOString(), type: "WITHDRAW", description: "Saque PIX DEMO", amount: -amount, status: "Concluído" },
            ...s.transactions,
          ],
        }));
        return { success: true };
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
              ...(win
                ? [{ id: generateId(), date: new Date().toISOString(), type: "WIN" as const, description: "Prêmio", amount: payout, status: "Concluído" }]
                : []),
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