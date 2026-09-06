"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/appStore";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/parallax/ParallaxSection";
import { toast } from "sonner";

const sports = ["Futebol", "Basquete", "Tênis", "Vôlei", "Fórmula 1", "E-sports"];
const filters = ["Ao vivo", "Hoje", "Amanhã", "Próximos eventos", "Favoritos"];

const events = [
  { id: "e1", sport: "Futebol", league: "Brasileirão", home: "Corinthians", away: "São Paulo", time: "20:00", odds: { casa: 2.3, empate: 3.0, fora: 2.9 } },
  { id: "e2", sport: "Futebol", league: "Premier League", home: "Liverpool", away: "Chelsea", time: "16:00", odds: { casa: 1.9, empate: 3.5, fora: 3.8 } },
  { id: "e3", sport: "Basquete", league: "NBA", home: "Bulls", away: "Heat", time: "21:30", odds: { casa: 1.75, empate: 0, fora: 2.05 } },
  { id: "e4", sport: "Tênis", league: "ATP", home: "Alcaraz", away: "Djokovic", time: "15:00", odds: { casa: 1.85, empate: 0, fora: 1.95 } },
  { id: "e5", sport: "Vôlei", league: "Superliga", home: "Sada Cruzeiro", away: "Minas", time: "19:00", odds: { casa: 1.6, empate: 0, fora: 2.2 } },
];

export default function EsportesPage() {
  const [activeSport, setActiveSport] = useState("Futebol");
  const [activeFilter, setActiveFilter] = useState("Hoje");
  const [betValue, setBetValue] = useState(100);
  const { betItems, addBetItem, removeBetItem, clearBetSlip, placeBet, balance } = useAppStore();

  const combinedOdd = betItems.reduce((acc, b) => acc * b.odd, 1) || 0;
  const potential = betValue * combinedOdd;

  const handleConfirm = () => {
    if (betItems.length === 0) return toast.error("Adicione seleções ao cupom");
    if (balance < betValue) return toast.error("Saldo insuficiente (DEMO). Faça um depósito virtual.");
    const win = Math.random() > 0.45;
    placeBet(betValue, win, win ? potential : 0);
    toast.success(win ? `Ganhou! Retorno ${potential.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}` : "Aposta registrada (DEMO). Resultado simulado: perdida.");
    clearBetSlip();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-56px)]">
      {/* left sidebar */}
      <div className="w-full lg:w-[220px] border-b lg:border-b-0 lg:border-r border-[#1f1f1f] bg-[#0f0f0f] p-4">
        <h3 className="font-bold text-sm mb-3">Esportes</h3>
        <div className="space-y-1">
          {sports.map((s) => (
            <button key={s} onClick={() => setActiveSport(s)} className={`w-full text-left px-3 py-2 rounded-lg text-sm ${activeSport === s ? "bg-[#1c1c1c] text-white border border-[#272727]" : "text-zinc-400 hover:bg-[#141414] hover:text-white"}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`text-xs px-3 py-1.5 rounded-full border ${activeFilter === f ? "bg-[#ff2d2d] border-[#ff2d2d] text-white" : "border-[#272727] text-zinc-400 hover:bg-[#1c1c1c]"}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* center */}
      <div className="flex-1 p-4 lg:p-6 space-y-4 max-w-3xl mx-auto w-full">
        <ScrollReveal><h1 className="text-xl font-black">{activeSport} • {activeFilter}</h1></ScrollReveal>
        <StaggerContainer className="space-y-4">
        {events.filter(e => activeSport === "Futebol" ? e.sport === "Futebol" : true).map((ev) => (
          <StaggerItem key={ev.id}><Card className="p-4 hover:border-[#333] transition">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-xs text-zinc-500">{ev.league} • {ev.time}</p>
                <p className="font-bold">{ev.home} <span className="text-zinc-500">x</span> {ev.away}</p>
              </div>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full">Aberto</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Casa", odd: ev.odds.casa },
                { label: "Empate", odd: ev.odds.empate },
                { label: "Fora", odd: ev.odds.fora },
              ].filter(o=>o.odd>0).map(o=>(
                <button key={o.label} onClick={()=>{ addBetItem({ id:`${ev.id}-${o.label}`, event:`${ev.home} x ${ev.away}`, market:o.label, odd:o.odd}); toast.success(`Adicionado: ${o.label} @ ${o.odd}`);}} className="rounded-lg border border-[#272727] bg-[#0a0a0a] hover:bg-[#ff2d2d] hover:text-white p-3 text-center group transition">
                  <div className="text-xs text-zinc-500 group-hover:text-white/70">{o.label}</div>
                  <div className="font-black text-[#ff2d2d] group-hover:text-white">{o.odd.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </Card></StaggerItem>
        ))}
        </StaggerContainer>
      </div>

      {/* bet slip */}
      <div className="w-full lg:w-[340px] border-t lg:border-t-0 lg:border-l border-[#1f1f1f] bg-[#0f0f0f] p-4 lg:sticky lg:top-[56px] lg:h-[calc(100vh-56px)] lg:overflow-y-auto">
        <h3 className="font-black text-sm mb-4">MINHAS APOSTAS {betItems.length>0 && <span className="ml-2 bg-[#ff2d2d] text-white text-xs px-2 py-0.5 rounded-full">{betItems.length}</span>}</h3>
        {betItems.length===0 ? (
          <div className="text-center py-10 text-zinc-500 text-sm">
            <p>Seu cupom está vazio</p>
            <p className="text-xs mt-1">Clique em uma odd para adicionar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {betItems.map(b=>(
              <div key={b.id} className="rounded-lg bg-[#141414] border border-[#272727] p-3">
                <div className="flex justify-between items-start">
                  <div><p className="text-sm font-medium">{b.event}</p><p className="text-xs text-zinc-500">{b.market} • Odd {b.odd.toFixed(2)}</p></div>
                  <button onClick={()=>removeBetItem(b.id)} className="text-zinc-500 hover:text-red-400 text-xs">✕</button>
                </div>
              </div>
            ))}
            <div className="border-t border-[#272727] pt-4 space-y-3">
              <div>
                <label className="text-xs text-zinc-400">Valor da aposta</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-zinc-500">R$</span>
                  <input type="number" value={betValue} onChange={e=>setBetValue(Number(e.target.value))} className="flex-1 bg-[#141414] border border-[#272727] rounded-lg px-3 py-2 text-white" />
                </div>
                <div className="flex gap-2 mt-2">
                  {[10,50,100,200].map(v=>(
                    <button key={v} onClick={()=>setBetValue(v)} className={`flex-1 text-xs py-2 rounded-lg border ${betValue===v?"bg-[#ff2d2d] border-[#ff2d2d] text-white":"border-[#272727] text-zinc-400 hover:bg-[#1c1c1c]"}`}>R$ {v}</button>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-[#141414] border border-[#272727] p-3">
                <div className="flex justify-between text-sm"><span className="text-zinc-400">Odd total</span><span className="font-bold">{combinedOdd.toFixed(2)}x</span></div>
                <div className="flex justify-between text-sm mt-1"><span className="text-zinc-400">Retorno potencial</span><span className="font-black text-emerald-400">{potential.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</span></div>
              </div>
              <Button onClick={handleConfirm} className="w-full">CONFIRMAR APOSTA</Button>
              <button onClick={clearBetSlip} className="w-full text-xs text-zinc-500 hover:text-white py-2">Limpar cupom</button>
            </div>
          </div>
        )}
        <p className="text-[10px] text-zinc-500 mt-4 text-center">Ambiente DEMO • Odds fictícias</p>
      </div>
    </div>
  );
}
