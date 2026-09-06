"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/appStore";

export default function NotificacoesPage() {
  const { notifications, markAllRead } = useAppStore();
  return (
    <div className="p-4 lg:p-6 max-w-[700px] mx-auto space-y-6">
      <div className="flex justify-between items-center"><h1 className="text-2xl font-black">Notificações</h1><Button variant="secondary" size="sm" onClick={markAllRead}>Marcar todas como lidas</Button></div>
      <div className="space-y-3">
        {notifications.map((n) => (
          <Card key={n.id} className={`p-4 ${!n.read ? "border-[#ff2d2d]/30 bg-[#ff2d2d]/5" : ""}`}>
            <div className="flex justify-between items-start"><div><p className="font-medium text-sm">{n.title}</p><p className="text-sm text-zinc-400 mt-1">{n.message}</p><p className="text-xs text-zinc-500 mt-2">{new Date(n.date).toLocaleString("pt-BR")}</p></div>{!n.read && <span className="h-2 w-2 rounded-full bg-[#ff2d2d] mt-1" />}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
