"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/parallax/ParallaxSection";

const promos = [
  { title: "Bônus de Boas-Vindas", desc: "Ganhe 100% de bônus virtual até R$ 500 DEMO no primeiro depósito fictício.", image: "from-[#ff2d2d] to-orange-600", valid: "Válido até 31/12/2026" },
  { title: "Cashback 10%", desc: "Receba 10% de volta em saldo bônus DEMO nas perdas da semana.", image: "from-violet-600 to-indigo-600", valid: "Toda segunda-feira" },
  { title: "Odds Turbinadas", desc: "Odds aumentadas nos clássicos do Brasileirão (DEMO).", image: "from-emerald-600 to-teal-600", valid: "Fins de semana" },
];

export default function PromocoesPage() {
  return (
    <div className="p-4 lg:p-6 max-w-[1100px] mx-auto space-y-6 overflow-x-hidden">
      <ScrollReveal><h1 className="text-2xl font-black">Promoções</h1></ScrollReveal>
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((p) => (
          <StaggerItem key={p.title}>
            <Card className="overflow-hidden hover:border-[#333] transition h-full">
              <div className={`h-40 bg-gradient-to-br ${p.image} p-6 flex flex-col justify-end text-white relative overflow-hidden`}>
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                <h3 className="font-black text-lg relative">{p.title}</h3>
                <p className="text-xs opacity-80 relative">{p.valid}</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-zinc-400">{p.desc}</p>
                <Button className="w-full mt-4" size="sm">Resgatar (DEMO)</Button>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
