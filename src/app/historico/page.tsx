"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/stores/appStore";
import { formatBRL } from "@/lib/utils";

export default function HistoricoPage() {
  const { transactions } = useAppStore();
  const [filter, setFilter] = useState("Todos");
  const types = ["Todos", "DEPOSIT", "WITHDRAW", "BET", "WIN"];
  const filtered = filter === "Todos" ? transactions : transactions.filter((t) => t.type === filter);
  return (
    <div className="p-4 lg:p-6 max-w-[900px] mx-auto space-y-6">
      <h1 className="text-2xl font-black">Histórico</h1>
      <div className="flex gap-2 flex-wrap">
        {types.map((t) => (
          <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-full text-sm border ${filter === t ? "bg-[#ff2d2d] border-[#ff2d2d] text-white" : "border-[#272727] text-zinc-400 hover:bg-[#1c1c1c]"}`}>{t}</button>
        ))}
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0a0a0a] text-zinc-500">
              <tr>
                <th className="text-left p-3 font-medium">Data</th>
                <th className="text-left p-3 font-medium">Tipo</th>
                <th className="text-left p-3 font-medium">Descrição</th>
                <th className="text-right p-3 font-medium">Valor</th>
                <th className="text-right p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-[#1f1f1f] hover:bg-[#1c1c1c]/50">
                  <td className="p-3 text-zinc-400 whitespace-nowrap">{new Date(t.date).toLocaleString("pt-BR")}</td>
                  <td className="p-3"><span className="text-xs bg-[#1c1c1c] border border-[#272727] px-2 py-1 rounded-full">{t.type}</span></td>
                  <td className="p-3">{t.description}</td>
                  <td className={`p-3 text-right font-bold ${t.amount >= 0 ? "text-emerald-400" : "text-red-400"}`}>{t.amount >= 0 ? "+" : ""}{formatBRL(t.amount)}</td>
                  <td className="p-3 text-right"><span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
