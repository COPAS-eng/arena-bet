"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/parallax/ParallaxSection";
import { CrashIcon, DoubleIcon, RoletaIcon } from "@/components/ui/category";

const promos = [
  { title: "Bônus de Boas-Vindas", desc: "Ganhe 100% de bônus virtual até R$ 500 DEMO no primeiro depósito fictício.", icon: CrashIcon, valid: "Válido até 31/12/2026" },
  { title: "Cashback 10%", desc: "Receba 10% de volta em saldo bônus DEMO nas perdas da semana.", icon: DoubleIcon, valid: "Toda segunda-feira" },
  { title: "Odds Turbinadas", desc: "Odds aumentadas nos clássicos do Brasileirão (DEMO).", icon: RoletaIcon, valid: "Fins de semana" },
];

export default function PromocoesPage() {
  return (
    <div className="p-4 lg:p-6 max-w-[1100px] mx-auto space-y-6 overflow-x-hidden">
      <ScrollReveal><h1 className="text-2xl font-black">Promoções</h1></ScrollReveal>
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((p) => {
          const Icon = p.icon;
          return (
          <StaggerItem key={p.title}>
            <Card className="overflow-hidden hover:border-[#333] transition h-full">
              <div className="h-40 bg-[#0a0a1a] relative flex items-center justify-center overflow-hidden border-b border-[#1f1f1f]">
                <Icon className="w-20 h-20 opacity-20" />
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
          );
        })}
      </StaggerContainer>
    </div>
  );
}
