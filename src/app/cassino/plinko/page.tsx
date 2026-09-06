"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/parallax/ParallaxSection";
export default function PlinkoPage(){ return (<div className="p-6 max-w-[800px] mx-auto space-y-6"><ScrollReveal><h1 className="text-2xl font-black">Plinko — DEMO</h1></ScrollReveal><ScrollReveal delay={0.1}><Card><CardContent className="p-10 text-center"><p className="text-5xl mb-4">🔮</p><p className="font-bold">Plinko em desenvolvimento</p><p className="text-sm text-zinc-500 mt-2">Escolha risco, solte a bola, multiplique.</p><Link href="/cassino/crash"><Button className="mt-6">Jogar Crash DEMO</Button></Link></CardContent></Card></ScrollReveal></div>);}
