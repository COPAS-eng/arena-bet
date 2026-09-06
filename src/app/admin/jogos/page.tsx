"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminJogos() {
  const [games, setGames] = useState([
    { id: "1", name: "Crash", category: "Crash", active: true },
    { id: "2", name: "Double", category: "Roleta", active: true },
    { id: "3", name: "Mines", category: "Mines", active: false },
  ]);
  const [name, setName] = useState("");
  return (
    <div className="p-4 lg:p-6 max-w-[800px] mx-auto space-y-6">
      <h1 className="text-xl font-black">Admin — Jogos</h1>
      <Card><CardContent className="p-4 flex gap-2">
        <Input placeholder="Nome do jogo" value={name} onChange={e=>setName(e.target.value)} />
        <Button onClick={()=>{
          if(!name) return toast.error("Informe nome");
          setGames([...games, { id: Date.now().toString(), name, category: "Slots", active: true }]);
          toast.success("Jogo adicionado (DEMO)");
          setName("");
        }}>Adicionar</Button>
      </CardContent></Card>
      <div className="space-y-3">
        {games.map(g=>(
          <Card key={g.id}><CardContent className="p-4 flex justify-between items-center">
            <div><p className="font-bold text-sm">{g.name}</p><p className="text-xs text-zinc-500">{g.category} • {g.active?"Ativo":"Inativo"}</p></div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={()=>{ setGames(games.map(x=>x.id===g.id?{...x, active:!x.active}:x)); toast.success(g.active?"Desativado":"Ativado");}}>{g.active?"Desativar":"Ativar"}</Button>
              <Button size="sm" variant="outline" onClick={()=>{ setGames(games.filter(x=>x.id!==g.id)); toast.success("Removido");}}>Remover</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
