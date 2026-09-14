"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/stores/appStore";
import { formatBRL } from "@/lib/utils";
import { ScrollReveal, ParallaxLayer } from "@/components/parallax/ParallaxSection";
import { toast } from "sonner";

function generateCrashPoint(): number {
  const r = Math.random();
  if (r < 0.05) return 1.0 + Math.random() * 0.2;
  const crash = 0.99 / (1 - r * 0.99);
  return Math.min(Math.max(crash, 1.01), 100);
}

function calculateMultiplier(elapsed: number, crashPoint: number): number {
  const m = Math.exp(elapsed * 0.018);
  return Math.min(m, crashPoint);
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
  const [roundSeed, setRoundSeed] = useState("");
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const cashedOutRef = useRef(false);
  const preferReducedMotion = useReducedMotion();

  useEffect(() => { cashedOutRef.current = cashedOut; }, [cashedOut]);

  const clearGameInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetGameState = useCallback(() => {
    clearGameInterval();
    setIsPlaying(false);
    setIsBetting(false);
    setCashedOut(false);
    setMultiplier(1.0);
  }, [clearGameInterval]);

  useEffect(() => {
    return () => clearGameInterval();
  }, [clearGameInterval]);

  const startGame = useCallback(() => {
    if (isPlaying || isBetting) return;
    const currentBalance = useAppStore.getState().balance;
    if (currentBalance < betAmount) {
      toast.error("Saldo insuficiente. Faça depósito DEMO.");
      return;
    }

    const cp = generateCrashPoint();
    const seed = Math.random().toString(36).slice(2, 10);
    setCrashPoint(cp);
    setRoundSeed(seed);
    setMultiplier(1.0);
    setIsBetting(true);
    setCashedOut(false);
    cashedOutRef.current = false;

    setTimeout(() => {
      setIsBetting(false);
      setIsPlaying(true);
      startTimeRef.current = performance.now();

      useAppStore.setState((s) => ({
        balance: s.balance - betAmount,
        transactions: [
          { id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, date: new Date().toISOString(), type: "BET" as const, description: "Crash DEMO", amount: -betAmount, status: "Concluído" },
          ...s.transactions,
        ],
      }));

      intervalRef.current = window.setInterval(() => {
        const elapsed = (performance.now() - startTimeRef.current) / 1000;
        const m = calculateMultiplier(elapsed, cp);
        setMultiplier(m);

        if (m >= cp) {
          clearGameInterval();
          setMultiplier(cp);
          setIsPlaying(false);
          setHistory((h) => [Number(cp.toFixed(2)), ...h].slice(0, 20));
          if (!cashedOutRef.current) {
            toast.error(`Crash em ${cp.toFixed(2)}x — Você não retirou a tempo`);
          }
        }
      }, preferReducedMotion ? 200 : 50);
    }, 1500);
  }, [isPlaying, isBetting, betAmount, clearGameInterval, preferReducedMotion]);

  const cashOut = useCallback(() => {
    if (!isPlaying || cashedOutRef.current) return;
    setCashedOut(true);
    cashedOutRef.current = true;
    clearGameInterval();
    setIsPlaying(false);

    const payout = betAmount * multiplier;
    const profit = payout - betAmount;

    useAppStore.setState((s) => ({
      balance: s.balance + payout,
      transactions: [
        { id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, date: new Date().toISOString(), type: "WIN" as const, description: `Crash cashout @ ${multiplier.toFixed(2)}x`, amount: payout, status: "Concluído" },
        ...s.transactions,
      ],
    }));
    setHistory((h) => [multiplier, ...h].slice(0, 20));
    toast.success(`Retirou em ${multiplier.toFixed(2)}x — +${formatBRL(profit)}`);
  }, [isPlaying, betAmount, multiplier, clearGameInterval]);

  const crashed = isPlaying === false && isBetting === false && multiplier >= crashPoint - 0.001 && !cashedOut && history[0] === Number(crashPoint.toFixed(2));

  const handleBetAmountChange = (value: string) => {
    const num = Number(value);
    if (Number.isFinite(num) && num >= 1 && num <= 100000) setBetAmount(Math.floor(num));
    else if (value === "") setBetAmount(1);
  };

  const quickBet = (value: number) => setBetAmount(value);

  return (
    <div className="p-4 lg:p-6 max-w-[1100px] mx-auto space-y-6 overflow-x-hidden">
      <ScrollReveal>
        <div className="flex items-center gap-2 text-sm text-zinc-400" role="status" aria-live="polite">
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
            <div className="bg-[#0f0f0f] p-2 flex gap-2 overflow-x-auto" role="list" aria-label="Histórico de multiplicadores">
              {history.map((h, i) => (
                <span key={i} className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${h < 2 ? "bg-red-500/20 text-red-400" : h < 5 ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"}`} role="listitem">{h.toFixed(2)}x</span>
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
                    animate={isPlaying && !preferReducedMotion ? { scale: [1, 1.02, 1] } : undefined}
                    transition={isPlaying && !preferReducedMotion ? { duration: 0.15, repeat: Infinity, ease: "easeInOut" } : undefined}
                  >{multiplier.toFixed(2)}x</motion.p>
                  <p className="text-zinc-500 text-sm mt-2" aria-live="polite">
                    {isPlaying ? "Em jogo — retire antes do crash!" : cashedOut ? "Você retirou!" : crashed ? "CRASH!" : "Pronto para apostar"}
                  </p>
                  {isPlaying && (
                    <div className="mt-4 h-2 w-64 bg-[#1f1f1f] rounded-full overflow-hidden mx-auto" role="progressbar" aria-valuenow={Math.min(100, (multiplier / crashPoint) * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso até o crash">
                      <motion.div
                        className="h-full bg-emerald-500"
                        animate={{ width: `${Math.min(100, (multiplier / crashPoint) * 100)}%` }}
                        transition={{ duration: preferReducedMotion ? 0 : 0.05, ease: "linear" }}
                      />
                    </div>
                  )}
                </motion.div>
              )}
              {isPlaying && !preferReducedMotion && (
                <svg className="absolute bottom-0 left-0 w-full h-32 opacity-30 parallax-will-change" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
                  <path d={`M0 100 Q 100 ${100 - multiplier * 8} 400 ${Math.max(0, 100 - multiplier * 12)}`} stroke="#00c950" strokeWidth="3" fill="none" />
                </svg>
              )}
            </div>
            <div className="p-4 flex gap-2 text-xs text-zinc-500 justify-between">
              <span>Provably fair DEMO — seed: {roundSeed || "..."}</span>
              <span>House edge 1%</span>
            </div>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="space-y-4">
          <Card className="p-5">
            <h3 className="font-bold mb-4">Apostar</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400" htmlFor="bet-amount">Valor</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-zinc-500">R$</span>
                  <input
                    id="bet-amount"
                    type="number"
                    value={betAmount}
                    onChange={(e) => handleBetAmountChange(e.target.value)}
                    className="flex-1 bg-[#0a0a0a] border border-[#272727] rounded-lg px-3 py-2 text-white"
                    min={1}
                    max={100000}
                    aria-describedby="bet-hint"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2" role="group" aria-label="Valores rápidos">
                  {[5, 10, 50, 100].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => quickBet(v)}
                      className={`text-xs py-2 rounded-lg border ${betAmount === v ? "bg-[#ff2d2d] border-[#ff2d2d] text-white" : "border-[#272727] text-zinc-400 hover:bg-[#1c1c1c]"}`}
                      aria-pressed={betAmount === v}
                    >
                      R$ {v}
                    </button>
                  ))}
                </div>
              </div>

              {!isPlaying && !isBetting ? (
                <Button onClick={startGame} className="w-full" size="lg" disabled={betAmount <= 0 || balance < betAmount}>
                  APOSTAR {formatBRL(betAmount)}
                </Button>
              ) : isBetting ? (
                <Button disabled className="w-full" size="lg" variant="secondary">
                  Aposta confirmada...
                </Button>
              ) : (
                <motion.button
                  onClick={cashOut}
                  disabled={cashedOut}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full ${cashedOut ? "opacity-50 bg-emerald-500" : "bg-emerald-500 hover:bg-emerald-600"}`}
                  aria-label={cashedOut ? `Retirado em ${multiplier.toFixed(2)}x` : `Retirar em ${multiplier.toFixed(2)}x`}
                >
                  {cashedOut ? `Retirado @ ${multiplier.toFixed(2)}x` : `RETIRAR @ ${multiplier.toFixed(2)}x`}
                </motion.button>
              )}

              <p id="bet-hint" className="text-[11px] text-zinc-500 text-center">DEMO • Saldo virtual • Sem dinheiro real</p>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-bold text-sm mb-3">Últimas rodadas</h4>
            <div className="space-y-2" role="list" aria-label="Histórico de rodadas">
              {history.slice(0, 8).map((h, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex justify-between text-sm" role="listitem">
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