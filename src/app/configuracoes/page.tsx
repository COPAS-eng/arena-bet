import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ConfigPage() {
  return (
    <div className="p-4 lg:p-6 max-w-[700px] mx-auto space-y-6">
      <h1 className="text-2xl font-black">Configurações</h1>
      <Card><CardHeader><h3 className="font-bold">Geral</h3></CardHeader><CardContent className="space-y-3 text-sm"><div className="flex justify-between"><span>Tema</span><span className="text-zinc-400">Escuro (fixo DEMO)</span></div><div className="flex justify-between"><span>Idioma</span><span className="text-zinc-400">Português (BR)</span></div><div className="flex justify-between"><span>Moeda</span><span className="text-zinc-400">BRL (R$)</span></div></CardContent></Card>
      <Card><CardContent className="p-4 text-xs text-zinc-500">Ambiente DEMO • Versão 1.0.0 • Nenhum dado real coletado</CardContent></Card>
    </div>
  );
}
