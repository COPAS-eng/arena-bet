"use client";
import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Toaster } from "sonner";
import { ScrollProgress, useGsapParallax } from "@/components/parallax/SmoothScroll";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useGsapParallax();
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ScrollProgress />
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 bg-[#0a0a0a] overflow-x-hidden">{children}</main>
      </div>
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
}
