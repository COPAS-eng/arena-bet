"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/stores/appStore";
import { formatBRL } from "@/lib/utils";
import { ScrollReveal, StaggerContainer, StaggerItem, ParallaxLayer } from "@/components/parallax/ParallaxSection";
import { toast } from "sonner";

export default function CarteiraPage() {
  const { balance, bonusBalance, deposit, withdraw, transactions } = useAppStore();
  const [depositAmount, setDepositAmount] = useState(100);
  const [withdrawAmount, setWithdrawAmount] = useState(100);
  const [tab, setTab] = useState<"deposit" | "withdraw">("deposit");

  return (
    <div className="p-4 lg:p-6 max-w-[900px] mx-auto space-y-6 overflow-x-hidden">
      <ScrollReveal><h1 className="text-2xl font-black">Minha Carteira</h1></ScrollReveal>
      <ScrollReveal delay={0.1}>
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-zinc-400">Saldo disponível</p>
              <p className="text-3xl font-black mt-1">{formatBRL(balance)}</p>
              <p className="text-xs text-zinc-500 mt-1">BRL • DEMO • Saldo virtual</p>
              <p className="text-sm text-zinc-400 mt-4">Bônus: <span className="text-amber-400 font-bold">{formatBRL(bonusBalance)}</span></p>
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <Button onClick={() => setTab("deposit")} variant={tab === "deposit" ? "default" : "secondary"}>Depositar</Button>
              <Button onClick={() => setTab("withdraw")} variant={tab === "withdraw" ? "default" : "secondary"}>Saque</Button>
            </div>
          </div>
          <p className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg p-3 mt-6">⚠️ Ambiente demonstrativo. Nenhum pagamento real será processado.</p>
        </CardContent>
        <ParallaxLayer offset={20} className="absolute -right-10 -bottom-10 opacity-10 text-8xl pointer-events-none">💰</ParallaxLayer>
      </Card>
      </ScrollReveal>

      {tab === "deposit" ? (
        <ScrollReveal><Card>
          <CardHeader><h3 className="font-bold">Depósito DEMO</h3><p className="text-sm text-zinc-500">Escolha o valor virtual para creditar</p></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 250, 500].map((v) => (
                <button key={v} onClick={() => setDepositAmount(v)} className={`py-3 rounded-xl border font-bold ${depositAmount === v ? "bg-[#ff2d2d] border-[#ff2d2d] text-white" : "border-[#272727] bg-[#0a0a0a] text-white hover:bg-[#1c1c1c]"}`}>R$ {v}</button>
              ))}
            </div>
            <div>
              <label className="text-xs text-zinc-400">Outro valor</label>
              <Input type="number" value={depositAmount} onChange={(e) => setDepositAmount(Number(e.target.value))} className="mt-1" />
            </div>
            <div className="rounded-xl border border-[#272727] bg-[#0a0a0a] p-4">
              <p className="text-sm text-zinc-400">Valor</p>
              <p className="text-xl font-black">{formatBRL(depositAmount)}</p>
              <p className="text-xs text-zinc-500">PIX DEMO • Aprovação instantânea</p>
            </div>
            <Button className="w-full" size="lg" onClick={async () => { const res = await deposit(depositAmount); if (res.success) toast.success(`Depósito DEMO de ${formatBRL(depositAmount)} creditado!`); else toast.error(res.error || "Erro no depósito"); }}>CONFIRMAR DEPÓSITO DEMO</Button>
          </CardContent>
        </Card></ScrollReveal>
      ) : (
        <ScrollReveal><Card>
          <CardHeader><h3 className="font-bold">Solicitar Saque</h3><p className="text-sm text-zinc-500">Saldo disponível: {formatBRL(balance)}</p></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400">Valor do saque</label>
              <Input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(Number(e.target.value))} className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Método</label>
              <select className="w-full mt-1 bg-[#141414] border border-[#272727] rounded-lg px-3 py-2.5 text-white text-sm">
                <option>PIX DEMO</option>
                <option>Transferência DEMO</option>
              </select>
            </div>
            <Button className="w-full" variant="secondary" size="lg" onClick={async () => {
              const res = await withdraw(withdrawAmount);
              if (res.success) toast.success(`Saque DEMO de ${formatBRL(withdrawAmount)} solicitado!`);
              else toast.error(res.error || "Saldo insuficiente");
            }}>SOLICITAR SAQUE DEMO</Button>
            <p className="text-xs text-zinc-500 text-center">Não armazenamos dados bancários reais na versão demo.</p>
          </CardContent>
        </Card></ScrollReveal>
      )}

      <Card>
        <CardHeader><h3 className="font-bold">Histórico</h3></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {transactions.slice(0, 8).map((t) => (
              <div key={t.id} className="flex justify-between items-center py-3 border-b border-[#1f1f1f] last:border-0">
                <div>
                  <p className="text-sm font-medium">{t.description}</p>
                  <p className="text-xs text-zinc-500">{new Date(t.date).toLocaleString("pt-BR")} • {t.status}</p>
                </div>
                <span className={`font-bold text-sm ${t.amount >= 0 ? "text-emerald-400" : "text-red-400"}`}>{t.amount >= 0 ? "+" : ""}{formatBRL(t.amount)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
