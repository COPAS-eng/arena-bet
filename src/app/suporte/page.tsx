"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SuportePage() {
  const [category, setCategory] = useState("Conta");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState([{ id: "1", subject: "Dúvida sobre depósito DEMO", status: "Aberto", date: new Date().toISOString() }]);

  return (
    <div className="p-4 lg:p-6 max-w-[900px] mx-auto space-y-6">
      <h1 className="text-2xl font-black">Central de Suporte</h1>
      <Card>
        <CardContent className="p-6">
          <p className="font-medium">Como podemos ajudar?</p>
          <Input placeholder="Digite sua dúvida..." className="mt-3" value={message} onChange={(e) => setMessage(e.target.value)} />
          <div className="flex flex-wrap gap-2 mt-4">
            {["Conta", "Pagamento", "Apostas", "Cassino", "Problemas técnicos"].map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs border ${category === c ? "bg-[#ff2d2d] border-[#ff2d2d] text-white" : "border-[#272727] text-zinc-400"}`}>{c}</button>
            ))}
          </div>
          <Input placeholder="Seu e-mail" type="email" className="mt-4" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button className="w-full mt-4" onClick={() => {
            if (!message || !email) return toast.error("Preencha e-mail e mensagem");
            setTickets([{ id: Math.random().toString(36).slice(2), subject: message.slice(0, 40), status: "Aberto", date: new Date().toISOString() }, ...tickets]);
            toast.success("Chamado aberto (DEMO)!");
            setMessage("");
          }}>ABRIR CHAMADO</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><h3 className="font-bold">Meus Chamados</h3></CardHeader>
        <CardContent>
          {tickets.map((t) => (
            <div key={t.id} className="flex justify-between items-center py-3 border-b border-[#1f1f1f] last:border-0">
              <div><p className="text-sm font-medium">{t.subject}</p><p className="text-xs text-zinc-500">{new Date(t.date).toLocaleString("pt-BR")}</p></div>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">{t.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
