"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/appStore";
import { toast } from "sonner";

export default function CadastroPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", birth: "" });
  const [loading, setLoading] = useState(false);
  const login = useAppStore((s) => s.login);
  const router = useRouter();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error("Preencha todos os campos");
    if (!form.email.includes("@")) return toast.error("E-mail inválido");
    if (form.password.length < 6) return toast.error("Senha mínimo 6 caracteres");
    if (form.password !== form.confirm) return toast.error("Senhas não conferem");
    if (!form.birth) return toast.error("Informe data de nascimento");
    const age = new Date().getFullYear() - new Date(form.birth).getFullYear();
    if (age < 18) return toast.error("Você deve ter 18+ anos");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    login(form.email, form.name);
    toast.success("Conta criada (DEMO)!");
    router.push("/");
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-4 py-10">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <h1 className="text-2xl font-black text-center">Criar conta</h1>
          <p className="text-sm text-zinc-500 text-center mt-1">Ambiente DEMO • +18</p>
          <form onSubmit={handle} className="space-y-3 mt-6">
            <Input placeholder="Nome completo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="E-mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Senha" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Input placeholder="Confirmar senha" type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
            <div>
              <label className="text-xs text-zinc-400">Data de nascimento</label>
              <Input type="date" value={form.birth} onChange={(e) => setForm({ ...form, birth: e.target.value })} />
            </div>
            <label className="flex items-start gap-2 text-xs text-zinc-400">
              <input type="checkbox" required className="mt-1" />
              <span>Aceito os <a className="text-[#ff2d2d]">Termos de uso</a> e <a className="text-[#ff2d2d]">Política de privacidade</a>. Confirmo que tenho 18+ anos e concordo com Jogo Responsável.</span>
            </label>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>{loading ? "Criando..." : "CRIAR CONTA"}</Button>
          </form>
          <p className="text-center text-sm mt-4 text-zinc-500">Já possui conta? <Link href="/login" className="text-[#ff2d2d] font-bold">Entrar</Link></p>
        </CardContent>
      </Card>
    </div>
  );
}
