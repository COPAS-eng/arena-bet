"use client";
import React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

export const FutebolIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#ff2d2d" strokeWidth="3"/>
    <circle cx="50" cy="50" r="30" fill="#2a2a4e"/>
    <path d="M20 50 Q35 35 50 50 Q65 65 80 50" stroke="#ff2d2d" strokeWidth="2" fill="none"/>
    <path d="M30 35 Q50 20 70 35" stroke="#ff2d2d" strokeWidth="2" fill="none"/>
    <path d="M30 65 Q50 80 70 65" stroke="#ff2d2d" strokeWidth="2" fill="none"/>
    <circle cx="50" cy="25" r="5" fill="#ff2d2d"/>
    <circle cx="30" cy="60" r="4" fill="#ff2d2d"/>
    <circle cx="70" cy="60" r="4" fill="#ff2d2d"/>
  </svg>
);

export const BasqueteIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="42" fill="#1a1a2e" stroke="#ff8c00" strokeWidth="3"/>
    <path d="M15 50 Q25 20 50 20 Q75 20 85 50 Q75 80 50 80 Q25 80 15 50Z" fill="#2a1500" stroke="#ff8c00" strokeWidth="2"/>
    <rect x="85" y="47" width="8" height="6" rx="2" fill="#ff8c00"/>
    <path d="M30 35 Q50 25 70 35" stroke="#ff8c00" strokeWidth="1" fill="none" opacity="0.5"/>
    <path d="M30 65 Q50 75 70 65" stroke="#ff8c00" strokeWidth="1" fill="none" opacity="0.5"/>
    <circle cx="50" cy="50" r="8" fill="#ff8c00" opacity="0.3"/>
  </svg>
);

export const TenisIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <ellipse cx="50" cy="40" rx="28" ry="10" fill="#1a1a2e" stroke="#00ff88" strokeWidth="2"/>
    <rect x="35" y="48" width="30" height="25" rx="5" fill="#1a1a2e" stroke="#00ff88" strokeWidth="2"/>
    <circle cx="30" cy="72" r="12" fill="#1a1a2e" stroke="#00ff88" strokeWidth="2"/>
    <circle cx="70" cy="72" r="12" fill="#1a1a2e" stroke="#00ff88" strokeWidth="2"/>
    <circle cx="30" cy="72" r="4" fill="#00ff88" opacity="0.5"/>
    <circle cx="70" cy="72" r="4" fill="#00ff88" opacity="0.5"/>
    <path d="M50 15 Q40 30 35 35" stroke="#00ff88" strokeWidth="1" fill="none"/>
    <path d="M50 15 Q60 30 65 35" stroke="#00ff88" strokeWidth="1" fill="none"/>
  </svg>
);

export const VoleiIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="42" fill="#1a1a2e" stroke="#ff69b4" strokeWidth="2"/>
    <path d="M20 50 Q35 30 50 50 Q65 70 80 50" stroke="#ff69b4" strokeWidth="1.5" fill="none" opacity="0.6"/>
    <path d="M25 45 Q40 25 55 45" stroke="#ff69b4" strokeWidth="1" fill="none" opacity="0.4"/>
    <path d="M25 55 Q40 75 55 55" stroke="#ff69b4" strokeWidth="1" fill="none" opacity="0.4"/>
    <circle cx="50" cy="50" r="10" fill="#ff69b4" opacity="0.2"/>
    <line x1="50" y1="8" x2="50" y2="92" stroke="#ff69b4" strokeWidth="0.5" opacity="0.3"/>
    <line x1="8" y1="50" x2="92" y2="50" stroke="#ff69b4" strokeWidth="0.5" opacity="0.3"/>
    <path d="M35 35 L50 20 L65 35" stroke="#ff69b4" strokeWidth="2" fill="none"/>
    <path d="M35 65 L50 80 L65 65" stroke="#ff69b4" strokeWidth="2" fill="none"/>
  </svg>
);

export const Formula1Icon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M30 80 L35 45 L50 35 L65 45 L70 80Z" fill="#1a1a2e" stroke="#ff2d2d" strokeWidth="2"/>
    <path d="M40 55 L50 42 L60 55" fill="#ff2d2d"/>
    <rect x="28" y="30" width="44" height="12" rx="3" fill="#ff2d2d"/>
    <circle cx="35" cy="85" r="8" fill="#2a2a2a" stroke="#666" strokeWidth="1"/>
    <circle cx="65" cy="85" r="8" fill="#2a2a2a" stroke="#666" strokeWidth="1"/>
    <circle cx="35" cy="85" r="3" fill="#ff2d2d"/>
    <circle cx="65" cy="85" r="3" fill="#ff2d2d"/>
    <line x1="50" y1="35" x2="50" y2="20" stroke="#ff2d2d" strokeWidth="2"/>
    <line x1="50" y1="20" x2="45" y2="12" stroke="#ff2d2d" strokeWidth="2"/>
    <line x1="50" y1="20" x2="55" y2="12" stroke="#ff2d2d" strokeWidth="2"/>
  </svg>
);

export const EsportsIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="15" y="30" width="70" height="50" rx="8" fill="#1a1a2e" stroke="#00ff88" strokeWidth="2"/>
    <rect x="25" y="40" width="50" height="30" rx="4" fill="#0a0a1a"/>
    <rect x="30" y="45" width="15" height="5" rx="1" fill="#00ff88"/>
    <rect x="30" y="53" width="10" height="3" rx="1" fill="#00ff88" opacity="0.5"/>
    <rect x="55" y="45" width="15" height="5" rx="1" fill="#ff2d2d"/>
    <rect x="55" y="53" width="10" height="3" rx="1" fill="#ff2d2d" opacity="0.5"/>
    <circle cx="75" cy="70" r="8" fill="#00ff88" opacity="0.3"/>
    <circle cx="75" cy="70" r="4" fill="#00ff88"/>
    <rect x="35" y="20" width="30" height="12" rx="3" fill="#1a1a2e" stroke="#00ff88" strokeWidth="1.5"/>
    <circle cx="50" cy="26" r="3" fill="#00ff88"/>
    <rect x="20" y="85" width="25" height="8" rx="3" fill="#1a1a2e" stroke="#00ff88" strokeWidth="1"/>
    <rect x="55" y="85" width="25" height="8" rx="3" fill="#1a1a2e" stroke="#00ff88" strokeWidth="1"/>
    <rect x="35" y="70" width="12" height="12" rx="2" fill="#ff2d2d"/>
    <rect x="53" y="70" width="12" height="12" rx="2" fill="#00ff88"/>
  </svg>
);

export const CrashIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="44" fill="#1a1a2e" stroke="#8b5cf6" strokeWidth="2"/>
    <path d="M50 10 L50 90" stroke="#8b5cf6" strokeWidth="2"/>
    <path d="M10 50 L90 50" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="50" y="58" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">💥</text>
    <circle cx="50" cy="50" r="20" fill="#8b5cf6" opacity="0.2"/>
    <circle cx="50" cy="50" r="30" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.3"/>
    <path d="M30 30 L70 70 M70 30 L30 70" stroke="#8b5cf6" strokeWidth="1" opacity="0.4"/>
  </svg>
);

export const DoubleIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="44" fill="#1a1a2e" stroke="#f97316" strokeWidth="2"/>
    <circle cx="50" cy="50" r="30" fill="#2a1500"/>
    <path d="M50 20 A30 30 0 0 1 80 50" stroke="#f97316" strokeWidth="2" fill="none"/>
    <path d="M50 80 A30 30 0 0 1 20 50" stroke="#f97316" strokeWidth="2" fill="none"/>
    <circle cx="50" cy="50" r="8" fill="#f97316"/>
    <circle cx="50" cy="50" r="3" fill="#fff"/>
    <path d="M50 5 L50 95" stroke="#f97316" strokeWidth="1" opacity="0.3"/>
    <path d="M5 50 L95 50" stroke="#f97316" strokeWidth="1" opacity="0.3"/>
  </svg>
);

export const MinesIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="44" fill="#1a1a2e" stroke="#10b981" strokeWidth="2"/>
    <ellipse cx="50" cy="50" rx="25" ry="20" fill="#0a2e1a" stroke="#10b981" strokeWidth="1.5"/>
    <path d="M35 50 L40 35 L50 30 L60 35 L65 50" stroke="#10b981" strokeWidth="2" fill="none"/>
    <path d="M40 50 L30 65 L35 80 L50 80" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.6"/>
    <path d="M60 50 L70 65 L65 80 L50 80" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.6"/>
    <circle cx="50" cy="45" r="3" fill="#10b981" opacity="0.5"/>
    <path d="M25 40 L20 35 M75 40 L80 35" stroke="#10b981" strokeWidth="1" opacity="0.3"/>
  </svg>
);

export const SlotsIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="15" y="25" width="70" height="50" rx="8" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2"/>
    <rect x="25" y="35" width="20" height="30" rx="3" fill="#2a2000" stroke="#f59e0b" strokeWidth="1"/>
    <rect x="50" y="35" width="20" height="30" rx="3" fill="#2a2000" stroke="#f59e0b" strokeWidth="1"/>
    <rect x="75" y="35" width="20" height="30" rx="3" fill="#2a2000" stroke="#f59e0b" strokeWidth="1"/>
    <circle cx="35" cy="50" r="5" fill="#f59e0b" opacity="0.5"/>
    <circle cx="60" cy="50" r="5" fill="#ef4444" opacity="0.5"/>
    <circle cx="85" cy="50" r="5" fill="#10b981" opacity="0.5"/>
    <rect x="30" y="20" width="40" height="8" rx="3" fill="#f59e0b"/>
    <text x="50" y="78" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">SLOTS</text>
  </svg>
);

export const RoletaIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="44" fill="#1a1a2e" stroke="#6b7280" strokeWidth="2"/>
    <circle cx="50" cy="50" r="35" fill="#2a2a2a"/>
    <path d="M50 15 A35 35 0 0 1 85 50 A35 35 0 0 1 50 85 A35 35 0 0 1 15 50 A35 35 0 0 1 50 15Z" fill="#dc2626" opacity="0.5"/>
    <path d="M50 15 A35 35 0 0 1 15 50 A35 35 0 0 1 50 85 A35 35 0 0 1 85 50 A35 35 0 0 1 50 15Z" fill="#f59e0b" opacity="0.5"/>
    <circle cx="50" cy="50" r="12" fill="#6b7280"/>
    <circle cx="50" cy="50" r="5" fill="#fff"/>
    <line x1="50" y1="50" x2="50" y2="15" stroke="#6b7280" strokeWidth="1" opacity="0.3"/>
    <line x1="50" y1="50" x2="85" y2="50" stroke="#6b7280" strokeWidth="1" opacity="0.3"/>
    <path d="M50 15 L48 12 L52 12Z" fill="#6b7280"/>
  </svg>
);

export const BlackjackIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="10" y="25" width="80" height="50" rx="8" fill="#1a1a2e" stroke="#10b981" strokeWidth="2"/>
    <rect x="25" y="35" width="22" height="30" rx="4" fill="#0a2e1a" stroke="#10b981" strokeWidth="1"/>
    <rect x="53" y="35" width="22" height="30" rx="4" fill="#0a2e1a" stroke="#10b981" strokeWidth="1"/>
    <text x="36" y="55" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">A</text>
    <text x="64" y="55" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">K</text>
    <circle cx="25" cy="35" r="3" fill="#10b981" opacity="0.5"/>
    <circle cx="53" cy="35" r="3" fill="#10b981" opacity="0.5"/>
    <rect x="40" y="20" width="20" height="8" rx="3" fill="#10b981"/>
    <text x="50" y="24" textAnchor="middle" fill="#000" fontSize="5" fontWeight="bold">21</text>
  </svg>
);

export const PlinkoIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="10" y="15" width="80" height="70" rx="8" fill="#1a1a2e" stroke="#ec4899" strokeWidth="2"/>
    <rect x="30" y="40" width="40" height="5" rx="2" fill="#ec4899" opacity="0.5"/>
    <rect x="20" y="55" width="60" height="5" rx="2" fill="#ec4899" opacity="0.5"/>
    <rect x="10" y="70" width="80" height="5" rx="2" fill="#ec4899" opacity="0.5"/>
    <rect x="25" y="25" width="2" height="10" fill="#ec4899" opacity="0.3"/>
    <rect x="45" y="25" width="2" height="10" fill="#ec4899" opacity="0.3"/>
    <rect x="65" y="25" width="2" height="10" fill="#ec4899" opacity="0.3"/>
    <circle cx="50" cy="85" r="5" fill="#ec4899"/>
    <circle cx="35" cy="85" r="4" fill="#f59e0b"/>
    <circle cx="65" cy="85" r="4" fill="#10b981"/>
    <path d="M50 15 L50 5" stroke="#ec4899" strokeWidth="2"/>
    <circle cx="50" cy="5" r="3" fill="#ec4899"/>
  </svg>
);

export const DiceIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="15" y="15" width="70" height="70" rx="10" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="2"/>
    <circle cx="35" cy="35" r="5" fill="#3b82f6" opacity="0.5"/>
    <circle cx="65" cy="35" r="5" fill="#3b82f6" opacity="0.5"/>
    <circle cx="50" cy="50" r="6" fill="#3b82f6" opacity="0.5"/>
    <circle cx="35" cy="65" r="5" fill="#3b82f6" opacity="0.5"/>
    <circle cx="65" cy="65" r="5" fill="#3b82f6" opacity="0.5"/>
    <rect x="40" y="20" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.3"/>
    <rect x="40" y="76" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.3"/>
  </svg>
);

export const CoinFlipIcon = ({ className = "w-12 h-12", ...props }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <ellipse cx="50" cy="50" rx="44" ry="35" fill="#1a1a2e" stroke="#fbbf24" strokeWidth="2"/>
    <path d="M30 25 Q50 15 70 25 Q85 40 85 50 Q85 60 70 75 Q50 85 30 75 Q15 60 15 50 Q15 40 30 25Z" fill="#2a2000" stroke="#fbbf24" strokeWidth="1"/>
    <text x="50" y="52" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">H</text>
    <circle cx="50" cy="50" r="20" fill="#fbbf24" opacity="0.1"/>
  </svg>
);
