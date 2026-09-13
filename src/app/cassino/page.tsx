"use client";
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem, ParallaxLayer } from "@/components/parallax/ParallaxSection";
import { CrashIcon, DoubleIcon, MinesIcon, SlotsIcon, RoletaIcon, BlackjackIcon, PlinkoIcon, DiceIcon } from "@/components/ui/category";

const categories = ["Todos", "Populares", "Novos", "Slots", "Roleta", "Blackjack", "Jogos ao vivo"];
const games = [
  { id: "crash", name: "Crash", category: "Jogos ao vivo", icon: CrashIcon, badge: "Popular", href: "/cassino/crash" },
  { id: "double", name: "Double", category: "Roleta", icon: DoubleIcon, badge: "Ao vivo", href: "/cassino/double" },
  { id: "mines", name: "Mines", category: "Slots", icon: MinesIcon, badge: "Novo", href: "/cassino/mines" },
  { id: "slots1", name: "Fortune Slots", category: "Slots", icon: SlotsIcon, badge: "Popular", href: "/cassino/slots" },
  { id: "roulette", name: "Roleta Europeia", category: "Roleta", icon: RoletaIcon, badge: null, href: "/cassino/roleta" },
  { id: "blackjack", name: "Blackjack Pro", category: "Blackjack", icon: BlackjackIcon, badge: null, href: "/cassino/blackjack" },
  { id: "plinko", name: "Plinko", category: "Jogos ao vivo", icon: PlinkoIcon, badge: "Novo", href: "/cassino/plinko" },
  { id: "dice", name: "Dice", category: "Slots", icon: DiceIcon, badge: null, href: "/cassino/dice" },
];

export default function CassinoPage() {
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? games : games.filter((g) => g.category === active || (active === "Populares" && g.badge === "Popular") || (active === "Novos" && g.badge === "Novo"));
  return (
    <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-6 overflow-x-hidden">
      <div className="relative rounded-2xl overflow-hidden border border-[#1f1f1f] bg-[#0f0f0f] p-6">
        <ParallaxLayer offset={30} className="absolute inset-0 pointer-events-none"><div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-indigo-600/10" /></ParallaxLayer>
        <ScrollReveal className="relative">
          <h1 className="text-2xl font-black">Cassino {active !== "Todos" && <span className="text-[#ff2d2d]">• {active}</span>}</h1>
          <p className="text-sm text-zinc-400 mt-1">Jogos DEMO • Parallax suave em todos os cards</p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${active === c ? "bg-[#ff2d2d] border-[#ff2d2d] text-white" : "border-[#272727] text-zinc-400 hover:bg-[#1c1c1c] hover:text-white"}`}
          >
            {c}
          </button>
        ))}
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((g) => {
          const Icon = g.icon;
          return (
          <StaggerItem key={g.id}>
            <Card className="group overflow-hidden hover:border-[#333] transition h-full">
              <div className="h-36 bg-[#0a0a1a] relative flex items-center justify-center overflow-hidden border-b border-[#1f1f1f]">
                <Icon className="w-16 h-16 opacity-30 group-hover:opacity-60 transition-opacity" />
                {g.badge && <span className="absolute top-2 left-2 z-10 text-[10px] font-bold bg-black/60 backdrop-blur text-white px-2 py-1 rounded-full border border-white/10">{g.badge}</span>}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Link href={g.href}>
                    <Button size="sm" className="font-black">
                      Jogar
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-3">
                <p className="font-bold text-sm">{g.name}</p>
                <p className="text-xs text-zinc-500">{g.category}</p>
                <Link href={g.href} className="mt-2 block">
                  <Button size="sm" className="w-full" variant="secondary">
                    Jogar
                  </Button>
                </Link>
              </div>
            </Card>
          </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}
