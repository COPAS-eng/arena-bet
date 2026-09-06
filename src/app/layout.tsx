import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "ARENA BET — Apostas Esportivas & Cassino | DEMO",
  description: "Plataforma DEMO de apostas esportivas e cassino. Ambiente demonstrativo sem dinheiro real. Jogue com saldo virtual.",
  openGraph: {
    title: "ARENA BET — DEMO",
    description: "Apostas esportivas e cassino em ambiente demonstrativo",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
