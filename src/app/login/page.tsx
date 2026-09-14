"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/appStore";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAppStore((s) => s.login);
  const router = useRouter();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return toast.error("E-mail inválido");
    if (password.length < 8) return toast.error("Senha deve ter 8+ caracteres");
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login realizado!");
      router.push("/");
    } catch {
      toast.error("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="h-12 w-12 rounded-xl bg-[#ff2d2d] flex items-center justify-center font-black text-white mx-auto" aria-hidden="true">A</div>
            <h1 className="text-2xl font-black mt-4">Entrar</h1>
            <p className="text-sm text-zinc-500 mt-1">Acesse sua conta DEMO</p>
          </div>
          <form onSubmit={handle} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="text-xs text-zinc-400">E-mail</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoComplete="email"
                required
                aria-describedby="email-hint"
              />
              <span id="email-hint" className="sr-only">Digite seu e-mail cadastrado</span>
            </div>
            <div>
              <label htmlFor="password" className="text-xs text-zinc-400">Senha</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                aria-describedby="password-hint"
              />
              <span id="password-hint" className="sr-only">Digite sua senha</span>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading} aria-busy={loading}>
              {loading ? "Entrando..." : "ENTRAR"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <a href="#" className="text-zinc-500 hover:text-white text-xs">Esqueci minha senha</a>
            <p className="mt-4 text-zinc-500">Ainda não possui conta? <Link href="/cadastro" className="text-[#ff2d2d] font-bold">Criar conta</Link></p>
          </div>
          <div className="mt-6 rounded-lg bg-[#0a0a0a] border border-[#272727] p-3" role="note">
            <p className="text-xs font-bold">Contas DEMO</p>
            <p className="text-xs text-zinc-500">demo@arena.bet / Demo123! • admin@arena.bet / Admin123!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}