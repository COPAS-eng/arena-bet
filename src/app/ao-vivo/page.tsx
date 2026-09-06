"use client";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/stores/appStore";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/parallax/ParallaxSection";
import { toast } from "sonner";

const live = [
  { id: "l1", league: "Brasileirão", home: "Flamengo 1", away: "Palmeiras 0", minute: "67'", odds: { casa: 1.45, empate: 4.2, fora: 7.5 } },
  { id: "l2", league: "NBA", home: "Lakers 89", away: "Warriors 92", minute: "Q3", odds: { casa: 2.1, fora: 1.75 } },
];

export default function AoVivoPage() {
  const add = useAppStore((s) => s.addBetItem);
  return (
    <div className="p-4 lg:p-6 max-w-[900px] mx-auto space-y-6 overflow-x-hidden">
      <ScrollReveal><h1 className="text-2xl font-black flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" /> Ao Vivo</h1></ScrollReveal>
      <StaggerContainer className="space-y-4">
        {live.map((ev) => (
          <StaggerItem key={ev.id}>
            <Card className="p-4 border-red-900/20 hover:border-red-900/40 transition">
              <div className="flex justify-between items-center mb-3">
                <div><p className="text-xs text-zinc-500">{ev.league} • {ev.minute}</p><p className="font-bold">{ev.home} x {ev.away}</p></div>
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">AO VIVO</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(ev.odds).map(([k, v]) => (
                  <button key={k} onClick={() => { add({ id: `${ev.id}-${k}`, event: `${ev.home} x ${ev.away}`, market: k, odd: v as number }); toast.success(`Adicionado @ ${v}`); }} className="rounded-lg border border-[#272727] bg-[#0a0a0a] hover:bg-[#ff2d2d] hover:text-white p-3 text-center transition group">
                    <div className="text-xs text-zinc-500 group-hover:text-white/70">{k}</div><div className="font-black text-[#ff2d2d] group-hover:text-white">{(v as number).toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
