"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/stores/appStore";
import { toast } from "sonner";

export default function PerfilPage() {
  const { user, isAuthenticated, logout } = useAppStore();
  if (!isAuthenticated) return <div className="p-10 text-center text-zinc-500">Faça login para ver seu perfil. <a href="/login" className="text-[#ff2d2d]">Entrar</a></div>;
  return (
    <div className="p-4 lg:p-6 max-w-[800px] mx-auto space-y-6">
      <h1 className="text-2xl font-black">Meu Perfil</h1>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#ff2d2d] to-orange-500 flex items-center justify-center text-white text-xl font-black">{user?.avatar}</div>
            <div>
              <p className="font-bold text-lg">{user?.name}</p>
              <p className="text-sm text-zinc-500">{user?.email}</p>
              <p className="text-xs text-zinc-500">Membro desde {new Date().toLocaleDateString("pt-BR")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><h3 className="font-bold">Segurança</h3></CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Senha atual" type="password" />
          <Input placeholder="Nova senha" type="password" />
          <Button variant="secondary" onClick={() => toast.success("Senha alterada (DEMO)")}>Alterar senha</Button>
          <div className="border-t border-[#1f1f1f] pt-4 space-y-2">
            <p className="text-sm font-medium">Sessões ativas • 1 dispositivo</p>
            <Button variant="outline" size="sm" onClick={() => toast.success("Logout de todos dispositivos (DEMO)")}>Logout de todos os dispositivos</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><h3 className="font-bold">Preferências</h3></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center"><span className="text-sm">Notificações</span><span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">Ativadas</span></div>
          <div className="flex justify-between items-center"><span className="text-sm">Tema</span><span className="text-xs bg-[#1c1c1c] border border-[#272727] px-2 py-1 rounded-full">Escuro</span></div>
          <div className="flex justify-between items-center"><span className="text-sm">Idioma</span><span className="text-xs bg-[#1c1c1c] border border-[#272727] px-2 py-1 rounded-full">Português (BR)</span></div>
        </CardContent>
      </Card>
      <Button variant="outline" className="w-full text-red-400 border-red-900/30 hover:bg-red-950/20" onClick={logout}>Sair da conta</Button>
    </div>
  );
}
