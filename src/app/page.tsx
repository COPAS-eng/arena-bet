"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/stores/appStore";
import { ScrollReveal, StaggerContainer, StaggerItem, ParallaxLayer } from "@/components/parallax/ParallaxSection";
import { ChevronLeft, ChevronRight, Zap, Trophy, Dices, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const banners = [
  { title: "OFERTA ESPECIAL", subtitle: "Ganhe bônus na sua primeira experiência DEMO", cta: "CONHECER OFERTA", gradient: "from-[#ff2d2d] via-orange-600 to-amber-500", accent: "🔥" },
  { title: "CRASH 2.5x", subtitle: "Multiplique seu saldo virtual no jogo Crash", cta: "JOGAR AGORA", gradient: "from-violet-600 via-indigo-600 to-blue-600", accent: "🚀" },
  { title: "SUPER ODDS", subtitle: "Odds turbinadas nos grandes clássicos", cta: "APOSTAR", gradient: "from-emerald-600 via-teal-600 to-cyan-600", accent: "⚡" },
];

const categories = [
  { icon: "⚽", label: "Futebol", count: "128 eventos" },
  { icon: "🏀", label: "Basquete", count: "42 eventos" },
  { icon: "🎾", label: "Tênis", count: "36 eventos" },
  { icon: "🏎", label: "Fórmula 1", count: "12 eventos" },
  { icon: "🎰", label: "Cassino", count: "200+ jogos" },
  { icon: "🔥", label: "Ao Vivo", count: "56 ao vivo" },
];

const featured = [
  { id: "1", league: "Brasileirão Série A", home: "Flamengo", away: "Palmeiras", time: "Hoje 21:00", odds: { casa: 2.1, empate: 3.2, fora: 2.8 } },
  { id: "2", league: "Premier League", home: "Man City", away: "Arsenal", time: "Hoje 16:00", odds: { casa: 1.85, empate: 3.4, fora: 4.2 } },
  { id: "3", league: "La Liga", home: "Barcelona", away: "Real Madrid", time: "Amanhã 17:00", odds: { casa: 2.4, empate: 3.1, fora: 2.9 } },
  { id: "4", league: "NBA", home: "Lakers", away: "Warriors", time: "Hoje 23:30", odds: { casa: 1.95, empate: 0, fora: 1.9 } },
];

function HeroParallax({ banner, onPrev, onNext }: { banner: typeof banners[0]; onPrev: () => void; onNext: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), { stiffness: 90, damping: 20 });
  const yShape = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), { stiffness: 70, damping: 18 });
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <motion.div ref={ref} style={{ opacity, scale }} className="relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-[#1f1f1f]">
      {/* gradient base */}
      <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} opacity-95`} />
      {/* parallax floating shapes */}
      <motion.div style={{ y: yShape }} className="absolute inset-0 overflow-hidden pointer-events-none parallax-will-change">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute right-40 top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" style={{ animation: "float 6s ease-in-out infinite" }} />
        <div className="absolute right-10 bottom-0 h-40 w-[55%] bg-white/10 hidden lg:block" style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }} />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </motion.div>

      <motion.div style={{ y: yText }} className="relative z-10 p-6 lg:p-10 parallax-will-change">
        <div className="max-w-xl">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <Sparkles size={12} /> DEMO • SALDO VIRTUAL <span className="text-lg leading-none">{banner.accent}</span>
          </motion.span>
          <motion.h1 key={banner.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-3xl lg:text-5xl font-black leading-tight text-white drop-shadow-sm">
            {banner.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-3 text-white/90 text-lg">
            {banner.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link href="/esportes">
              <Button size="lg" className="mt-6 bg-white text-black hover:bg-zinc-100 font-black gap-2 group">
                {banner.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <button onClick={onPrev} aria-label="Anterior" className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur border border-white/10 text-white transition">
        <ChevronLeft size={20} />
      </button>
      <button onClick={onNext} aria-label="Próximo" className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur border border-white/10 text-white transition">
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}

export default function HomePage() {
  const [idx, setIdx] = useState(0);
  const addBet = useAppStore((s) => s.addBetItem);
  const b = banners[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-4 lg:p-6 space-y-10 max-w-[1400px] mx-auto overflow-x-hidden">
      {/* HERO with parallax */}
      <div className="space-y-3">
        <HeroParallax banner={b} onPrev={() => setIdx((i) => (i - 1 + banners.length) % banners.length)} onNext={() => setIdx((i) => (i + 1) % banners.length)} />
        <div className="flex justify-center gap-2">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Ir para banner ${i + 1}`} className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-8 bg-[#ff2d2d]" : "w-8 bg-[#222] hover:bg-[#333]"}`} />
          ))}
        </div>
      </div>

      {/* categories with stagger + parallax */}
      <ScrollReveal>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-widest text-zinc-400">CATEGORIAS</h2>
          <span className="text-xs text-zinc-500">Parallax ao rolar ↓</span>
        </div>
      </ScrollReveal>
      <StaggerContainer className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((c) => (
          <StaggerItem key={c.label}>
            <Link href={c.label === "Cassino" ? "/cassino" : c.label === "Ao Vivo" ? "/ao-vivo" : "/esportes"} className="group relative overflow-hidden rounded-xl border border-[#272727] bg-[#141414] p-4 hover:bg-[#1c1c1c] hover:border-[#333] transition text-center block">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="relative text-2xl group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
              <div className="relative font-bold text-sm mt-2">{c.label}</div>
              <div className="relative text-xs text-zinc-500">{c.count}</div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* featured events with parallax depth */}
      <div className="space-y-4">
        <ScrollReveal className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-[#ff2d2d]/15 border border-[#ff2d2d]/20 flex items-center justify-center">
              <Trophy size={16} className="text-[#ff2d2d]" />
            </span>
            Eventos em Destaque
          </h2>
          <Link href="/esportes" className="text-sm text-[#ff2d2d] hover:underline font-medium">Ver todos →</Link>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-4">
          {featured.map((ev) => (
            <StaggerItem key={ev.id}>
              <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
                <Card className="p-4 hover:border-[#333] transition h-full flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-zinc-500 font-medium">{ev.league} • {ev.time}</p>
                      <p className="font-bold mt-1">{ev.home} <span className="text-zinc-500 font-normal">x</span> {ev.away}</p>
                    </div>
                    <span className="text-xs bg-[#ff2d2d]/10 text-[#ff2d2d] border border-[#ff2d2d]/20 px-2 py-1 rounded-full font-bold animate-pulse">AO VIVO</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Casa", odd: ev.odds.casa, team: ev.home },
                      { label: "Empate", odd: ev.odds.empate, team: "Empate" },
                      { label: "Fora", odd: ev.odds.fora, team: ev.away },
                    ]
                      .filter((o) => o.odd > 0)
                      .map((o) => (
                        <button
                          key={o.label}
                          onClick={() => {
                            addBet({ id: `${ev.id}-${o.label}`, event: `${ev.home} x ${ev.away}`, market: o.label, odd: o.odd });
                            toast.success(`Adicionado ao cupom: ${o.team} @ ${o.odd}`);
                          }}
                          className="rounded-lg border border-[#272727] bg-[#0a0a0a] hover:bg-[#ff2d2d] hover:border-[#ff2d2d] hover:text-white p-3 text-center transition group"
                        >
                          <div className="text-xs text-zinc-500 group-hover:text-white/70">{o.label}</div>
                          <div className="font-black text-[#ff2d2d] group-hover:text-white">{o.odd.toFixed(2)}</div>
                        </button>
                      ))}
                  </div>
                  <Button
                    onClick={() => {
                      addBet({ id: `${ev.id}-Casa`, event: `${ev.home} x ${ev.away}`, market: "Casa", odd: ev.odds.casa });
                      toast.success("Adicionado ao cupom!");
                    }}
                    className="w-full mt-3"
                    size="sm"
                  >
                    APOSTAR
                  </Button>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* parallax showcase strip */}
      <div className="relative overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#0f0f0f]">
        <ParallaxLayer offset={40} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff2d2d]/20 via-orange-500/10 to-transparent" />
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-[#ff2d2d]/20 blur-3xl" />
        </ParallaxLayer>
        <ScrollReveal className="relative p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-widest text-[#ff2d2d]">ARENA BET • DEMO</p>
            <h3 className="text-2xl font-black mt-1">Experiência real, saldo virtual</h3>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">Tudo com parallax suave, transições 60fps e respeito a <code className="bg-[#1c1c1c] px-1.5 py-0.5 rounded text-xs">prefers-reduced-motion</code>.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/cassino/crash"><Button>Testar Crash</Button></Link>
            <Link href="/carteira"><Button variant="secondary">Carteira DEMO</Button></Link>
          </div>
        </ScrollReveal>
      </div>

      {/* quick access with depth */}
      <StaggerContainer className="grid md:grid-cols-3 gap-4">
        <StaggerItem>
          <Link href="/cassino/crash" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white block hover:scale-[1.02] transition-transform duration-300">
            <ParallaxLayer offset={20} className="absolute -right-6 -bottom-6 opacity-20 text-7xl">🚀</ParallaxLayer>
            <Zap className="mb-3 relative" />
            <h3 className="font-black text-lg relative">Crash DEMO</h3>
            <p className="text-sm opacity-80 relative">Multiplicador em tempo real com saldo virtual</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold mt-3 bg-white/20 backdrop-blur px-3 py-1 rounded-full relative">Jogar <ArrowRight size={12} /></span>
          </Link>
        </StaggerItem>
        <StaggerItem>
          <Link href="/cassino" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#ff2d2d] to-orange-600 p-6 text-white block hover:scale-[1.02] transition-transform duration-300">
            <ParallaxLayer offset={20} className="absolute -right-6 -bottom-6 opacity-20 text-7xl">🎰</ParallaxLayer>
            <Dices className="mb-3 relative" />
            <h3 className="font-black text-lg relative">Cassino</h3>
            <p className="text-sm opacity-80 relative">Slots, Roleta, Blackjack e mais</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold mt-3 bg-white/20 backdrop-blur px-3 py-1 rounded-full relative">Explorar <ArrowRight size={12} /></span>
          </Link>
        </StaggerItem>
        <StaggerItem>
          <Link href="/carteira" className="group rounded-xl bg-[#1c1c1c] border border-[#272727] p-6 hover:bg-[#222] transition block">
            <h3 className="font-black text-lg">Carteira DEMO</h3>
            <p className="text-sm text-zinc-400">Deposite e saque com saldo virtual (PIX DEMO)</p>
            <span className="inline-block mt-3 text-sm font-bold text-[#ff2d2d] group-hover:gap-2 flex items-center gap-1">Acessar carteira <ArrowRight size={14} /></span>
          </Link>
        </StaggerItem>
      </StaggerContainer>

      <p className="text-center text-xs text-zinc-500 py-4 border-t border-[#1f1f1f]">Ambiente demonstrativo. Nenhum pagamento real será processado. +18 • Jogue com responsabilidade.</p>
    </div>
  );
}
