"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminPromocoes() {
  const [promos, setPromos] = useState([
    { id: "1", title: "Bônus Boas-Vindas", desc: "100% até R$500 DEMO", active: true },
  ]);
  const [title, setTitle] = useState("");
  return (
    <div className="p-4 lg:p-6 max-w-[800px] mx-auto space-y-6">
      <h1 className="text-xl font-black">Admin — Promoções</h1>
      <Card><CardContent className="p-4 flex gap-2">
        <Input placeholder="Título da promoção" value={title} onChange={e=>setTitle(e.target.value)} />
        <Button onClick={()=>{
          if(!title) return toast.error("Informe título");
          setPromos([...promos, { id: Date.now().toString(), title, desc: "Descrição DEMO", active: true }]);
          toast.success("Promoção criada");
          setTitle("");
        }}>Criar</Button>
      </CardContent></Card>
      {promos.map(p=>(
        <Card key={p.id}><CardContent className="p-4 flex justify-between items-center">
          <div><p className="font-bold text-sm">{p.title}</p><p className="text-xs text-zinc-500">{p.desc}</p></div>
          <Button size="sm" variant="outline" onClick={()=>setPromos(promos.filter(x=>x.id!==p.id))}>Remover</Button>
        </CardContent></Card>
      ))}
    </div>
  );
}
