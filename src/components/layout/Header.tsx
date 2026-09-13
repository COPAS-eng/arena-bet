"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/appStore";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/utils";
import { Menu, X, Bell, LogOut, User, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const nav = [
  { label: "Início", href: "/" },
  { label: "Esportes", href: "/esportes" },
  { label: "Cassino", href: "/cassino" },
  { label: "Ao Vivo", href: "/ao-vivo" },
  { label: "Promoções", href: "/promocoes" },
];

const linkVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const dropdownVariants = {
  initial: { opacity: 0, y: -8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
};

export function Header({ onMenuToggle, sidebarOpen }: { onMenuToggle: () => void; sidebarOpen: boolean }) {
  const pathname = usePathname();
  const { isAuthenticated, balance, logout, user, notifications } = useAppStore();
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const preferReducedMotion = useReducedMotion();
  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const unread = notifications.filter((n) => !n.read).length;

  const handleUserMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowUserMenu(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 flex h-[56px] items-center justify-between border-b border-[#1f1f1f] bg-[#0a0a0a]/95 backdrop-blur px-4 lg:px-6 transition-all duration-300 ${scrolled ? "shadow-[0_4px_24px_rgba(255,45,45,0.08)] bg-[#0a0a0a]/98" : "bg-[#0a0a0a]/95"}`}
    >
      <div className="flex items-center gap-4">
        <motion.button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-[#1c1c1c] text-zinc-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>

        <Link href="/" className="flex items-center gap-2" aria-label="ARENA BET - Início">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
            className="h-8 w-8 rounded-lg bg-[#ff2d2d] flex items-center justify-center font-black text-white text-sm"
            aria-hidden="true"
          >
            A
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-black text-lg tracking-tight"
          >
            ARENA<span className="text-[#ff2d2d]">BET</span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="hidden sm:inline text-[10px] bg-[#1c1c1c] border border-[#2a2a2a] px-1.5 py-0.5 rounded text-zinc-400 ml-1"
          >
            DEMO
          </motion.span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-6" aria-label="Navegação principal">
          <AnimatePresence mode="popLayout">
            {nav.map((item, index) => (
              <motion.div
                key={item.href}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === item.href ? "bg-[#1c1c1c] text-white" : "text-zinc-400 hover:text-white hover:bg-[#141414]"}`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-6 bg-[#ff2d2d] rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {!hydrated ? (
          <motion.div className="h-8 w-24 skeleton rounded-full hidden sm:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        ) : !isAuthenticated ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.5 }} className="flex items-center gap-2">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Entrar</Button>
              </motion.button>
            </Link>
            <Link href="/cadastro">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="sm">Criar conta</Button>
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.5 }} className="hidden sm:flex items-center gap-2">
              <Link href="/carteira" className="flex items-center gap-2 bg-[#141414] border border-[#272727] rounded-full pl-3 pr-1 py-1">
                <motion.span
                  layoutId="balance"
                  className="text-sm font-bold text-white"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {formatBRL(balance)}
                </motion.span>
                <span className="bg-[#ff2d2d] text-white text-xs font-bold px-3 py-1.5 rounded-full">Depositar</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="relative"
            >
              <motion.button
                onClick={handleUserMenuToggle}
                className="relative p-2.5 rounded-full bg-[#141414] border border-[#272727] hover:bg-[#1c1c1c]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Notificações"
                aria-expanded={showNotif}
              >
                <Bell size={16} className="text-zinc-300" />
                {unread > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#ff2d2d] text-white text-[10px] flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 17 }}
                  >
                    {unread}
                  </motion.span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotif && (
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 w-80 rounded-xl border border-[#272727] bg-[#141414] shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-[#272727] flex justify-between items-center">
                      <span className="font-semibold text-sm">Notificações</span>
                      <motion.span
                        className="text-xs bg-[#ff2d2d] px-2 py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {unread} novas
                      </motion.span>
                    </div>
                    <motion.div
                      className="max-h-80 overflow-y-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {notifications.slice(0, 5).map((n) => (
                        <motion.div
                          key={n.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 }}
                          className="p-3 border-b border-[#1f1f1f] hover:bg-[#1c1c1c]"
                        >
                          <p className="text-sm font-medium">{n.title}</p>
                          <p className="text-xs text-zinc-400">{n.message}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                    <Link
                      href="/notificacoes"
                      onClick={() => setShowNotif(false)}
                      className="block text-center py-3 text-sm text-[#ff2d2d] hover:bg-[#1c1c1c] transition-colors"
                    >
                      Ver todas
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="relative"
            >
              <motion.button
                onClick={handleUserMenuToggle}
                className="flex items-center gap-2 bg-[#141414] border border-[#272727] rounded-full pl-1 pr-3 py-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Menu do usuário ${user?.name}`}
                aria-expanded={showUserMenu}
              >
                <motion.div
                  className="h-7 w-7 rounded-full bg-gradient-to-br from-[#ff2d2d] to-orange-500 flex items-center justify-center text-white text-xs font-bold"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.8 }}
                >
                  {user?.avatar}
                </motion.div>
                <motion.span className="text-sm font-medium hidden sm:inline">{user?.name}</motion.span>
                <ChevronDown size={14} className="text-zinc-400 hidden sm:block" />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-[#272727] bg-[#141414] shadow-2xl overflow-hidden z-50 py-1"
                  >
                    <Link
                      href="/perfil"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#1c1c1c] transition-colors"
                    >
                      <User size={16} />
                      Perfil
                    </Link>
                    <Link
                      href="/configuracoes"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#1c1c1c] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Configurações
                    </Link>
                    <hr className="border-[#1f1f1f] my-1" />
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-950/20 transition-colors"
                    >
                      <LogOut size={16} />
                      Sair
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              onClick={logout}
              className="p-2 rounded-full bg-[#141414] border border-[#272727] hover:bg-red-950/30 text-zinc-400 hover:text-red-400 lg:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Sair"
            >
              <LogOut size={16} />
            </motion.button>
          </>
        )}
      </div>
    </motion.header>
  );
}

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`animate-pulse rounded bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] bg-[length:200%_100%] ${className || ""}`} {...props} />
  );
}