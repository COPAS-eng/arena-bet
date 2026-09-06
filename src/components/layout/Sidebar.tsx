"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Flame, Dice5, Gift, Wallet, ScrollText, User, Headphones, Settings, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Início", href: "/", icon: Home },
  { label: "Esportes", href: "/esportes", icon: Trophy },
  { label: "Ao Vivo", href: "/ao-vivo", icon: Flame },
  { label: "Cassino", href: "/cassino", icon: Dice5 },
  { label: "Crash Demo", href: "/cassino/crash", icon: Flame },
  { label: "Promoções", href: "/promocoes", icon: Gift },
  { label: "Carteira", href: "/carteira", icon: Wallet },
  { label: "Histórico", href: "/historico", icon: ScrollText },
  { label: "Perfil", href: "/perfil", icon: User },
  { label: "Suporte", href: "/suporte", icon: Headphones },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
  { label: "Admin", href: "/admin", icon: Shield },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onClose} />}
      <aside className={cn("fixed lg:sticky top-[56px] left-0 z-30 h-[calc(100vh-56px)] w-[240px] border-r border-[#1f1f1f] bg-[#0f0f0f] flex flex-col transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <Link key={it.href} href={it.href} onClick={onClose} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition", active ? "bg-[#1c1c1c] text-white border border-[#272727]" : "text-zinc-400 hover:text-white hover:bg-[#141414]")}>
                <it.icon size={18} className={active ? "text-[#ff2d2d]" : ""} />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-[#1f1f1f]">
          <div className="rounded-xl bg-gradient-to-br from-[#ff2d2d] to-orange-600 p-4 text-white">
            <p className="text-sm font-bold">Bônus de Boas-Vindas</p>
            <p className="text-xs opacity-90 mt-1">Ganhe até R$ 500 em bônus DEMO</p>
            <Link href="/promocoes" className="mt-3 inline-block bg-white text-[#ff2d2d] text-xs font-bold px-3 py-1.5 rounded-full">Resgatar →</Link>
          </div>
          <p className="text-[10px] text-zinc-500 mt-3 text-center">Ambiente DEMO • Sem dinheiro real</p>
        </div>
      </aside>
    </>
  );
}
