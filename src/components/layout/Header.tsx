"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/stores/appStore";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/utils";
import { Menu, X, Bell, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";

const nav = [
  { label: "Início", href: "/" },
  { label: "Esportes", href: "/esportes" },
  { label: "Cassino", href: "/cassino" },
  { label: "Ao Vivo", href: "/ao-vivo" },
  { label: "Promoções", href: "/promocoes" },
];

export function Header({ onMenuToggle, sidebarOpen }: { onMenuToggle: () => void; sidebarOpen: boolean }) {
  const pathname = usePathname();
  const { isAuthenticated, balance, logout, user, notifications } = useAppStore();
  const [showNotif, setShowNotif] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 flex h-[56px] items-center justify-between border-b border-[#1f1f1f] bg-[#0a0a0a]/95 backdrop-blur px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-lg hover:bg-[#1c1c1c] text-zinc-400">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#ff2d2d] flex items-center justify-center font-black text-white text-sm">A</div>
          <span className="font-black text-lg tracking-tight">ARENA<span className="text-[#ff2d2d]">BET</span></span>
          <span className="hidden sm:inline text-[10px] bg-[#1c1c1c] border border-[#2a2a2a] px-1.5 py-0.5 rounded text-zinc-400 ml-1">DEMO</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${pathname === item.href ? "bg-[#1c1c1c] text-white" : "text-zinc-400 hover:text-white hover:bg-[#141414]"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {!hydrated ? (
          <div className="h-8 w-24 skeleton rounded-full hidden sm:block" />
        ) : !isAuthenticated ? (
          <>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Entrar</Button>
            </Link>
            <Link href="/cadastro">
              <Button size="sm">Criar conta</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/carteira" className="hidden sm:flex items-center gap-2 bg-[#141414] border border-[#272727] rounded-full pl-3 pr-1 py-1">
              <span className="text-sm font-bold text-white">{formatBRL(balance)}</span>
              <span className="bg-[#ff2d2d] text-white text-xs font-bold px-3 py-1.5 rounded-full">Depositar</span>
            </Link>
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2.5 rounded-full bg-[#141414] border border-[#272727] hover:bg-[#1c1c1c]">
                <Bell size={16} className="text-zinc-300" />
                {unread > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#ff2d2d] text-white text-[10px] flex items-center justify-center font-bold">{unread}</span>}
              </button>
              {showNotif && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl border border-[#272727] bg-[#141414] shadow-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-[#272727] flex justify-between items-center">
                    <span className="font-semibold text-sm">Notificações</span>
                    <span className="text-xs bg-[#ff2d2d] px-2 py-1 rounded-full">{unread} novas</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.slice(0, 5).map((n) => (
                      <div key={n.id} className="p-3 border-b border-[#1f1f1f] hover:bg-[#1c1c1c]">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-zinc-400">{n.message}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/notificacoes" onClick={() => setShowNotif(false)} className="block text-center py-3 text-sm text-[#ff2d2d] hover:bg-[#1c1c1c]">Ver todas</Link>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 bg-[#141414] border border-[#272727] rounded-full pl-1 pr-3 py-1">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#ff2d2d] to-orange-500 flex items-center justify-center text-white text-xs font-bold">{user?.avatar}</div>
              <span className="text-sm font-medium hidden sm:inline">{user?.name}</span>
            </div>
            <Link href="/perfil" className="p-2 rounded-full bg-[#141414] border border-[#272727] hidden sm:flex"><User size={16} /></Link>
            <button onClick={logout} className="p-2 rounded-full bg-[#141414] border border-[#272727] hover:bg-red-950/30 text-zinc-400 hover:text-red-400"><LogOut size={16} /></button>
          </>
        )}
      </div>
    </header>
  );
}
