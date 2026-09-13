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
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", birth: "", terms: false });
  const [loading, setLoading] = useState(false);
  const login = useAppStore((s) => s.login);
  const router = useRouter();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const calculateAge = (birth: string) => {
    const today = new Date();
    const birthDate = new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Nome é obrigatório");
    if (!validateEmail(form.email)) return toast.error("E-mail inválido");
    if (form.password.length < 8) return toast.error("Senha mínimo 8 caracteres");
    if (!/[A-Z]/.test(form.password)) return toast.error("Senha deve ter uma maiúscula");
    if (!/[0-9]/.test(form.password)) return toast.error("Senha deve ter um número");
    if (form.password !== form.confirm) return toast.error("Senhas não conferem");
    if (!form.birth) return toast.error("Informe data de nascimento");
    if (calculateAge(form.birth) < 18) return toast.error("Você deve ter 18+ anos");
    if (!form.terms) return toast.error("Aceite os termos e condições");

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      login(form.email, form.name);
      toast.success("Conta criada (DEMO)!");
      router.push("/");
    } catch {
      toast.error("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-4 py-10">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <h1 className="text-2xl font-black text-center">Criar conta</h1>
          <p className="text-sm text-zinc-500 text-center mt-1">Ambiente DEMO • +18</p>
          <form onSubmit={handle} className="space-y-3 mt-6" noValidate>
            <Input
              placeholder="Nome completo"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoComplete="name"
              required
              aria-describedby="name-hint"
            />
            <span id="name-hint" className="sr-only">Seu nome completo</span>
            <Input
              placeholder="E-mail"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
              required
              aria-describedby="email-hint"
            />
            <span id="email-hint" className="sr-only">Seu e-mail</span>
            <Input
              placeholder="Senha (mín. 8 chars, 1 maiúscula, 1 número)"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="new-password"
              required
              aria-describedby="password-hint"
            />
            <span id="password-hint" className="sr-only">Crie uma senha forte</span>
            <Input
              placeholder="Confirmar senha"
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              autoComplete="new-password"
              required
              aria-describedby="confirm-hint"
            />
            <span id="confirm-hint" className="sr-only">Confirme sua senha</span>
            <div>
              <label htmlFor="birth" className="text-xs text-zinc-400">Data de nascimento</label>
              <Input
                id="birth"
                type="date"
                value={form.birth}
                onChange={(e) => setForm({ ...form, birth: e.target.value })}
                max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                required
              />
            </div>
            <fieldset className="space-y-2">
              <legend className="text-xs text-zinc-400">Termos e responsabilidade</legend>
              <label className="flex items-start gap-2 text-xs text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                  required
                  className="mt-1 accent-[#ff2d2d]"
                />
                <span>
                  Aceito os <a className="text-[#ff2d2d] underline">Termos de uso</a> e <a className="text-[#ff2d2d] underline">Política de privacidade</a>.
                  Confirmo que tenho 18+ anos e concordo com <a className="text-[#ff2d2d] underline">Jogo Responsável</a>.
                </span>
              </label>
            </fieldset>
            <Button type="submit" className="w-full" size="lg" disabled={loading} aria-busy={loading}>
              {loading ? "Criando..." : "CRIAR CONTA"}
            </Button>
          </form>
          <p className="text-center text-sm mt-4 text-zinc-500">Já possui conta? <Link href="/login" className="text-[#ff2d2d] font-bold">Entrar</Link></p>
        </CardContent>
      </Card>
    </div>
  );
}