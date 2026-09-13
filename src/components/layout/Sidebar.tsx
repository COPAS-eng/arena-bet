"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Home, Trophy, Flame, Dice5, Gift, Wallet, ScrollText, User, Headphones, Settings, Shield, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Início", href: "/", icon: Home },
  { label: "Esportes", href: "/esportes", icon: Trophy },
  { label: "Ao Vivo", href: "/ao-vivo", icon: Flame },
  { label: "Cassino", href: "/cassino", icon: Dice5 },
  { label: "Crash Demo", href: "/cassino/crash", icon: Zap },
  { label: "Promoções", href: "/promocoes", icon: Gift },
  { label: "Carteira", href: "/carteira", icon: Wallet },
  { label: "Histórico", href: "/historico", icon: ScrollText },
  { label: "Perfil", href: "/perfil", icon: User },
  { label: "Suporte", href: "/suporte", icon: Headphones },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
  { label: "Admin", href: "/admin", icon: Shield },
];

const linkVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const badgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
};

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const preferReducedMotion = useReducedMotion();

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className={cn("fixed lg:sticky top-[56px] left-0 z-30 h-[calc(100vh-56px)] w-[240px] border-r border-[#1f1f1f] bg-[#0f0f0f] flex flex-col lg:translate-x-0")}
      >
        <motion.nav
          initial="initial"
          animate="animate"
          variants={{ initial: {}, animate: { transition: { staggerChildren: 0.04 } } }}
          className="flex-1 overflow-y-auto p-3 space-y-1"
        >
          {items.map((it, index) => {
            const active = pathname === it.href;
            return (
              <motion.div key={it.href} variants={linkVariants} custom={index}>
                <Link
                  href={it.href}
                  onClick={onClose}
                  className={cn("relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 overflow-hidden group", active ? "bg-[#1c1c1c] text-white border border-[#272727]" : "text-zinc-400 hover:text-white hover:bg-[#141414]")}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30, delay: index * 0.03 }}
                    className="flex-shrink-0"
                  >
                    <it.icon size={18} className={cn(active ? "text-[#ff2d2d]" : "group-hover:text-[#ff2d2d]", "transition-colors")} />
                  </motion.div>
                  <span>{it.label}</span>
                  {active && (
                    <motion.div
                      layoutId="activeSidebar"
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-[#ff2d2d] rounded-r-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="p-3 border-t border-[#1f1f1f]"
        >
          <div className="relative rounded-xl bg-gradient-to-br from-[#ff2d2d] to-orange-600 p-4 text-white overflow-hidden">
            <motion.div
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl"
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <p className="text-sm font-bold flex items-center gap-1">
                <Sparkles size={14} className="text-white" /> Bônus de Boas-Vindas
              </p>
              <p className="text-xs opacity-90 mt-1">Ganhe até R$ 500 em bônus DEMO</p>
              <Link href="/promocoes" className="mt-3 inline-block bg-white text-[#ff2d2d] text-xs font-bold px-3 py-1.5 rounded-full hover:bg-zinc-100 transition-colors">
                Resgatar →
              </Link>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] text-zinc-500 mt-3 text-center"
          >
            Ambiente DEMO • Sem dinheiro real
          </motion.p>
        </motion.div>
      </motion.aside>
    </>
  );
}