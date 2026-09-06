"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/stores/appStore";
import { formatBRL } from "@/lib/utils";
import { ScrollReveal, ParallaxLayer } from "@/components/parallax/ParallaxSection";
import { toast } from "sonner";

function generateCrashPoint(): number {
  const r = Math.random();
  // house edge ~ 1-2%, distribution similar to real crash
  if (r < 0.05) return 1.0 + Math.random() * 0.2;
  const crash = 0.99 / (1 - r * 0.99);
  return Math.min(Math.max(crash, 1.01), 100);
}

export default function CrashPage() {
  const { balance, deposit } = useAppStore();
  const [betAmount, setBetAmount] = useState(10);
  const [multiplier, setMultiplier] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBetting, setIsBetting] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [crashPoint, setCrashPoint] = useState(2.5);
  const [history, setHistory] = useState<number[]>([2.54, 1.23, 5.67, 1.05, 3.12, 8.9, 1.42]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    if (isPlaying || isBetting) return;
    const currentBalance = useAppStore.getState().balance;
    if (currentBalance < betAmount) return toast.error("Saldo insuficiente. Faça depósito DEMO.");
    const cp = generateCrashPoint();
    setCrashPoint(cp);
    setMultiplier(1.0);
    setIsBetting(true);
    setCashedOut(false);
    // betting phase 2s then playing
    setTimeout(() => {
      setIsBetting(false);
      setIsPlaying(true);
      // deduct
      useAppStore.setState((s) => ({ balance: s.balance - betAmount, transactions: [{ id: Math.random().toString(36).slice(2), date: new Date().toISOString(), type: "BET" as const, description: "Crash DEMO", amount: -betAmount, status: "Concluído" }, ...s.transactions] }));
      let m = 1.0;
      intervalRef.current = setInterval(() => {
        m = m * 1.015 + 0.01 * Math.random();
        if (m >= cp) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setMultiplier(cp);
          setIsPlaying(false);
          setHistory((h) => [Number(cp.toFixed(2)), ...h].slice(0, 20));
          if (!cashedOut) toast.error(`Crash em ${cp.toFixed(2)}x — Você não retirou a tempo`);
        } else {
          setMultiplier(Number(m.toFixed(2)));
        }
      }, 80);
    }, 1500);
  };

  const cashOut = () => {
    if (!isPlaying || cashedOut) return;
    setCashedOut(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
    const payout = betAmount * multiplier;
    const profit = payout - betAmount;
    useAppStore.setState((s) => ({
      balance: s.balance + payout,
      transactions: [
        { id: Math.random().toString(36).slice(2), date: new Date().toISOString(), type: "WIN" as const, description: `Crash cashout @ ${multiplier.toFixed(2)}x`, amount: payout, status: "Concluído" },
        ...s.transactions,
      ],
    }));
    setHistory((h) => [multiplier, ...h].slice(0, 20));
    toast.success(`Retirou em ${multiplier.toFixed(2)}x — +${formatBRL(profit)}`);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const crashed = !isPlaying && !isBetting && multiplier >= crashPoint - 0.01 && !cashedOut && history[0] === Number(crashPoint.toFixed(2));

  return (
    <div className="p-4 lg:p-6 max-w-[1100px] mx-auto space-y-6 overflow-x-hidden">
      <ScrollReveal>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="bg-[#ff2d2d] text-white text-xs font-bold px-2 py-1 rounded">DEMO</span>
          <span>Saldo DEMO: <b className="text-white">{formatBRL(balance)}</b> — Nenhum dinheiro real</span>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        <ScrollReveal>
          <Card className="overflow-hidden relative">
            <ParallaxLayer offset={15} className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#ff2d2d]/10 blur-3xl" />
            </ParallaxLayer>
            <div className="bg-[#0f0f0f] p-2 flex gap-2 overflow-x-auto">
              {history.map((h, i) => (
                <span key={i} className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${h < 2 ? "bg-red-500/20 text-red-400" : h < 5 ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"}`}>{h.toFixed(2)}x</span>
              ))}
            </div>
            <div className="h-[340px] bg-gradient-to-br from-[#0a0a0a] to-[#141414] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 parallax-will-change" style={{ backgroundImage: "linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              {isBetting ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center">
                  <p className="text-amber-400 font-black text-2xl animate-pulse">Aguardando próxima rodada...</p>
                  <p className="text-zinc-500 text-sm mt-2">Crash point será sorteado (provably fair DEMO)</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center">
                  <motion.p
                    className={`font-black text-6xl lg:text-7xl tabular-nums ${isPlaying ? "text-emerald-400" : crashed ? "text-red-500" : cashedOut ? "text-emerald-400" : "text-white"}`}
                    animate={{ scale: isPlaying ? [1, 1.02, 1] : 1 }}
                    transition={isPlaying ? { duration: 0.15, repeat: Infinity, ease: "easeInOut" } : {}}
                  >{multiplier.toFixed(2)}x</motion.p>
                  <p className="text-zinc-500 text-sm mt-2">{isPlaying ? "Em jogo — retire antes do crash!" : cashedOut ? "Você retirou!" : crashed ? "CRASH!" : "Pronto para apostar"}</p>
                  {isPlaying && (
                    <div className="mt-4 h-2 w-64 bg-[#1f1f1f] rounded-full overflow-hidden mx-auto">
                      <motion.div className="h-full bg-emerald-500" animate={{ width: `${Math.min(100, (multiplier / crashPoint) * 100)}%` }} transition={{ duration: 0.08, ease: "linear" }} />
                    </div>
                  )}
                </motion.div>
              )}
              {isPlaying && (
                <svg className="absolute bottom-0 left-0 w-full h-32 opacity-30 parallax-will-change" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <path d={`M0 100 Q 100 ${100 - multiplier * 8} 400 ${Math.max(0, 100 - multiplier * 12)}`} stroke="#00c950" strokeWidth="3" fill="none" />
                </svg>
              )}
            </div>
            <div className="p-4 flex gap-2 text-xs text-zinc-500 justify-between">
              <span>Provably fair DEMO — seed: {Math.random().toString(36).slice(2, 10)}...</span>
              <span>House edge 1%</span>
            </div>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="space-y-4">
          <Card className="p-5">
            <h3 className="font-bold mb-4">Apostar</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400">Valor</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-zinc-500">R$</span>
                  <input type="number" value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} className="flex-1 bg-[#0a0a0a] border border-[#272727] rounded-lg px-3 py-2 text-white" min={1} />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[5, 10, 50, 100].map((v) => (
                    <button key={v} onClick={() => setBetAmount(v)} className={`text-xs py-2 rounded-lg border ${betAmount === v ? "bg-[#ff2d2d] border-[#ff2d2d] text-white" : "border-[#272727] text-zinc-400 hover:bg-[#1c1c1c]"}`}>R$ {v}</button>
                  ))}
                </div>
              </div>

              {!isPlaying && !isBetting ? (
                <Button onClick={startGame} className="w-full" size="lg">APOSTAR {formatBRL(betAmount)}</Button>
              ) : isBetting ? (
                <Button disabled className="w-full" size="lg" variant="secondary">Aposta confirmada...</Button>
              ) : (
                <motion.button
                  onClick={cashOut}
                  disabled={cashedOut}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full ${cashedOut ? "opacity-50 bg-emerald-500" : "bg-emerald-500 hover:bg-emerald-600"}`}
                >
                  {cashedOut ? `Retirado @ ${multiplier.toFixed(2)}x` : `RETIRAR @ ${multiplier.toFixed(2)}x`}
                </motion.button>
              )}

              <p className="text-[11px] text-zinc-500 text-center">DEMO • Saldo virtual • Sem dinheiro real</p>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-bold text-sm mb-3">Últimas rodadas</h4>
            <div className="space-y-2">
              {history.slice(0, 8).map((h, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex justify-between text-sm">
                  <span className="text-zinc-500">#{1000 - i}</span>
                  <span className={`font-bold ${h < 2 ? "text-red-400" : h < 5 ? "text-amber-400" : "text-emerald-400"}`}>{h.toFixed(2)}x</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
