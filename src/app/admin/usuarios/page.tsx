"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const mockUsers = [
  { id: "1", name: "João Silva", email: "joao@email.com", saldo: 1250, status: "Ativo" },
  { id: "2", name: "Maria Santos", email: "maria@email.com", saldo: 320, status: "Ativo" },
  { id: "3", name: "Carlos Oliveira", email: "carlos@email.com", saldo: 0, status: "Bloqueado" },
  { id: "4", name: "Demo User", email: "demo@arena.bet", saldo: 1000, status: "Ativo" },
];

export default function AdminUsuarios() {
  const [q, setQ] = useState("");
  const filtered = mockUsers.filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.includes(q));
  return (
    <div className="p-4 lg:p-6 max-w-[1100px] mx-auto space-y-6">
      <h1 className="text-xl font-black">Admin — Usuários</h1>
      <Input placeholder="Buscar por nome ou e-mail..." value={q} onChange={e=>setQ(e.target.value)} />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0a0a0a] text-zinc-500"><tr><th className="text-left p-3">ID</th><th className="text-left p-3">Nome</th><th className="text-left p-3">E-mail</th><th className="text-right p-3">Saldo</th><th className="text-center p-3">Status</th><th className="text-right p-3">Ações</th></tr></thead>
            <tbody>
              {filtered.map(u=>(
                <tr key={u.id} className="border-t border-[#1f1f1f]">
                  <td className="p-3">{u.id}</td><td className="p-3 font-medium">{u.name}</td><td className="p-3 text-zinc-400">{u.email}</td><td className="p-3 text-right font-bold">R$ {u.saldo}</td>
                  <td className="p-3 text-center"><span className={`text-xs px-2 py-1 rounded-full ${u.status==="Ativo"?"bg-emerald-500/20 text-emerald-400":"bg-red-500/20 text-red-400"}`}>{u.status}</span></td>
                  <td className="p-3 text-right space-x-1">
                    <Button size="sm" variant="secondary" onClick={()=>toast.success(`Visualizando ${u.name}`)}>Ver</Button>
                    <Button size="sm" variant="outline" onClick={()=>toast.success(`${u.name} ${u.status==="Ativo"?"bloqueado":"desbloqueado"} (DEMO)`)}>{u.status==="Ativo"?"Bloquear":"Desbloquear"}</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
