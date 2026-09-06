"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

type AppState = {
  isAuthenticated: boolean;
  user: { name: string; email: string; avatar: string } | null;
  balance: number;
  bonusBalance: number;
  betItems: BetItem[];
  transactions: Transaction[];
  notifications: { id: string; title: string; message: string; read: boolean; date: string }[];
  login: (email: string, name: string) => void;
  logout: () => void;
  addTransaction: (t: Omit<Transaction, "id" | "date"> & { amount: number }) => void;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => boolean;
  placeBet: (amount: number, win: boolean, payout: number) => void;
  addBetItem: (item: BetItem) => void;
  removeBetItem: (id: string) => void;
  clearBetSlip: () => void;
  markAllRead: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      balance: 1000,
      bonusBalance: 250,
      betItems: [],
      transactions: [
        { id: "1", date: new Date().toISOString(), type: "DEPOSIT", description: "Depósito DEMO", amount: 100, status: "Concluído" },
        { id: "2", date: new Date(Date.now() - 86400000).toISOString(), type: "BET", description: "Aposta - Flamengo x Palmeiras", amount: -20, status: "Concluído" },
        { id: "3", date: new Date(Date.now() - 172800000).toISOString(), type: "WIN", description: "Prêmio - Crash 2.54x", amount: 38, status: "Concluído" },
      ],
      notifications: [
        { id: "1", title: "Bônus disponível", message: "Novo bônus de boas-vindas disponível!", read: false, date: new Date().toISOString() },
        { id: "2", title: "Depósito processado", message: "Seu depósito de R$ 100,00 foi creditado.", read: false, date: new Date().toISOString() },
        { id: "3", title: "Aposta encerrada", message: "Sua aposta em Crash foi finalizada.", read: true, date: new Date().toISOString() },
      ],
      login: (email, name) => set({ isAuthenticated: true, user: { name, email, avatar: name[0]?.toUpperCase() } }),
      logout: () => set({ isAuthenticated: false, user: null, betItems: [] }),
      addTransaction: (t) =>
        set((s) => ({
          transactions: [
            { id: Math.random().toString(36).slice(2), date: new Date().toISOString(), ...t },
            ...s.transactions,
          ],
        })),
      deposit: (amount) =>
        set((s) => {
          const newBal = s.balance + amount;
          return {
            balance: newBal,
            transactions: [
              { id: Math.random().toString(36).slice(2), date: new Date().toISOString(), type: "DEPOSIT", description: "Depósito DEMO", amount, status: "Concluído" },
              ...s.transactions,
            ],
            notifications: [
              { id: Math.random().toString(36).slice(2), title: "Depósito processado", message: `Depósito de ${amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} creditado.`, read: false, date: new Date().toISOString() },
              ...s.notifications,
            ],
          };
        }),
      withdraw: (amount) => {
        const s = get();
        if (s.balance < amount) return false;
        set((state) => ({
          balance: state.balance - amount,
          transactions: [
            { id: Math.random().toString(36).slice(2), date: new Date().toISOString(), type: "WITHDRAW", description: "Saque PIX DEMO", amount: -amount, status: "Concluído" },
            ...state.transactions,
          ],
        }));
        return true;
      },
      placeBet: (amount, win, payout) =>
        set((s) => {
          const newBal = win ? s.balance - amount + payout : s.balance - amount;
          return {
            balance: newBal,
            transactions: [
              { id: Math.random().toString(36).slice(2), date: new Date().toISOString(), type: "BET", description: "Aposta esportiva", amount: -amount, status: win ? "Ganha" : "Perdida" },
              ...(win
                ? [{ id: Math.random().toString(36).slice(2), date: new Date().toISOString(), type: "WIN" as const, description: "Prêmio", amount: payout, status: "Concluído" }]
                : []),
              ...s.transactions,
            ],
          };
        }),
      addBetItem: (item) => set((s) => (s.betItems.find((b) => b.id === item.id) ? s : { betItems: [...s.betItems, item] })),
      removeBetItem: (id) => set((s) => ({ betItems: s.betItems.filter((b) => b.id !== id) })),
      clearBetSlip: () => set({ betItems: [] }),
      markAllRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
    }),
    { name: "arena-bet-storage", partialize: (s) => ({ balance: s.balance, transactions: s.transactions, isAuthenticated: s.isAuthenticated, user: s.user }) }
  )
);
