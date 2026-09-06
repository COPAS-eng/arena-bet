import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function DoublePage() {
  return (
    <div className="p-6 max-w-[800px] mx-auto space-y-6">
      <h1 className="text-2xl font-black">Double — DEMO</h1>
      <Card><CardContent className="p-10 text-center">
        <p className="text-5xl mb-4">🔴 ⚫ ⚪</p>
        <p className="font-bold">Double em desenvolvimento (DEMO)</p>
        <p className="text-sm text-zinc-500 mt-2">Roleta com 15 slots: 7 vermelho, 7 preto, 1 branco (14x). Apostas 2x e 14x. provably fair.</p>
        <Link href="/cassino/crash"><Button className="mt-6">Jogar Crash DEMO</Button></Link>
      </CardContent></Card>
    </div>
  );
}
