"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppStore } from "@/stores/appStore";
import { formatBRL } from "@/lib/utils";

export default function AdminPage() {
  const { transactions } = useAppStore();
  const volume = transactions.filter(t=>t.amount>0).reduce((a,c)=>a+c.amount,0);
  return (
    <div className="p-4 lg:p-6 max-w-[1200px] mx-auto space-y-6">
      <h1 className="text-2xl font-black">Painel Administrativo <span className="text-sm font-normal text-zinc-500">DEMO</span></h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Usuários", value: "12.540", sub: "+3.2% hoje" },
          { label: "Usuários Online", value: "824", sub: "agora" },
          { label: "Apostas Hoje", value: "8.421", sub: "+12%" },
          { label: "Volume DEMO", value: formatBRL(volume*10), sub: "total fictício" },
        ].map((c) => (
          <Card key={c.label}><CardContent className="p-5"><p className="text-xs text-zinc-500">{c.label}</p><p className="text-2xl font-black mt-1">{c.value}</p><p className="text-xs text-emerald-400">{c.sub}</p></CardContent></Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card><CardHeader><h3 className="font-bold">Transações Recentes</h3></CardHeader><CardContent>
          <div className="space-y-2">
            {transactions.slice(0,5).map(t=>(
              <div key={t.id} className="flex justify-between text-sm py-2 border-b border-[#1f1f1f] last:border-0"><span>{t.description}</span><span className={t.amount>=0?"text-emerald-400":"text-red-400"}>{formatBRL(t.amount)}</span></div>
            ))}
          </div>
        </CardContent></Card>
        <Card><CardHeader><h3 className="font-bold">Ações Rápidas</h3></CardHeader><CardContent className="grid grid-cols-2 gap-2">
          <a href="/admin/usuarios" className="rounded-lg bg-[#ff2d2d] text-white p-4 text-center font-bold text-sm">Usuários</a>
          <a href="/admin/apostas" className="rounded-lg bg-[#1c1c1c] border border-[#272727] p-4 text-center font-bold text-sm">Apostas</a>
          <a href="/admin/jogos" className="rounded-lg bg-[#1c1c1c] border border-[#272727] p-4 text-center font-bold text-sm">Jogos</a>
          <a href="/admin/promocoes" className="rounded-lg bg-[#1c1c1c] border border-[#272727] p-4 text-center font-bold text-sm">Promoções</a>
        </CardContent></Card>
      </div>
      <Card><CardContent className="p-4"><p className="text-xs text-zinc-500">Gráficos Recharts podem ser integrados aqui • Dados fictícios para demonstração • Acesso restrito a ADMIN/SUPER_ADMIN</p></CardContent></Card>
    </div>
  );
}
