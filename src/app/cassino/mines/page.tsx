import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function MinesPage(){ return (
  <div className="p-6 max-w-[800px] mx-auto space-y-6">
    <h1 className="text-2xl font-black">Mines — DEMO</h1>
    <Card><CardContent className="p-10 text-center">
      <p className="text-5xl mb-4">💣</p>
      <p className="font-bold">Mines 5x5 em desenvolvimento (DEMO)</p>
      <p className="text-sm text-zinc-500 mt-2">Escolha minas (1-24), revele células, multiplicador aumenta. Cash out a qualquer momento.</p>
      <Link href="/cassino/crash"><Button className="mt-6">Jogar Crash DEMO</Button></Link>
    </CardContent></Card>
  </div>
);}
