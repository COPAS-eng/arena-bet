"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";

const bets = [
  { id: "B123", user: "joao@email.com", event: "Flamengo x Palmeiras", valor: 50, odd: 2.1, resultado: "Pendente", status: "pendente" },
  { id: "B124", user: "maria@email.com", event: "Crash 3.2x", valor: 20, odd: 3.2, resultado: "Ganha", status: "ganha" },
  { id: "B125", user: "demo@arena.bet", event: "Man City x Arsenal", valor: 100, odd: 1.85, resultado: "Perdida", status: "perdida" },
];

export default function AdminApostas() {
  const [filter, setFilter] = useState("todas");
  const filtered = filter === "todas" ? bets : bets.filter(b=>b.status===filter);
  return (
    <div className="p-4 lg:p-6 max-w-[1100px] mx-auto space-y-6">
      <h1 className="text-xl font-black">Admin — Apostas</h1>
      <div className="flex gap-2">{["todas","pendente","ganha","perdida","cancelada"].map(f=>(
        <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs border capitalize ${filter===f?"bg-[#ff2d2d] border-[#ff2d2d] text-white":"border-[#272727] text-zinc-400"}`}>{f}</button>
      ))}</div>
      <Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-[#0a0a0a] text-zinc-500"><tr><th className="text-left p-3">ID</th><th className="text-left p-3">Usuário</th><th className="text-left p-3">Evento</th><th className="text-right p-3">Valor</th><th className="text-right p-3">Odd</th><th className="text-center p-3">Resultado</th><th className="text-center p-3">Status</th></tr></thead><tbody>{filtered.map(b=>(
        <tr key={b.id} className="border-t border-[#1f1f1f]"><td className="p-3 font-mono text-xs">{b.id}</td><td className="p-3">{b.user}</td><td className="p-3">{b.event}</td><td className="p-3 text-right">R$ {b.valor}</td><td className="p-3 text-right">{b.odd}</td><td className="p-3 text-center">{b.resultado}</td><td className="p-3 text-center"><span className="text-xs bg-[#1c1c1c] border border-[#272727] px-2 py-1 rounded-full">{b.status}</span></td></tr>
      ))}</tbody></table></div></Card>
    </div>
  );
}
