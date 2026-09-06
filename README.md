# ARENA BET — Plataforma DEMO de Apostas & Cassino

Plataforma web moderna inspirada em grandes cassinos online, com identidade visual própria (ARENA BET), dark mode, design responsivo e modo DEMO sem dinheiro real.

> **Aviso:** Ambiente 100% demonstrativo. Nenhum pagamento real é processado. Saldo virtual (BRL). +18.

## Stack
- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS + shadcn/ui pattern
- Prisma + PostgreSQL
- Zustand (client state) + React Query
- Socket.io (tempo real)
- Zod + React Hook Form

## Estrutura
```
/src/app         → rotas (home, esportes, cassino, carteira, admin...)
/src/components  → ui, layout (Header, Sidebar), games
/src/lib         → prisma, utils, validations
/src/stores      → Zustand (appStore)
prisma/schema.prisma
```

## Requisitos
- Node 20+
- PostgreSQL 15+ (ou Docker)

## Instalação
```bash
npm install
cp .env.example .env   # ajuste DATABASE_URL e NEXTAUTH_SECRET
npx prisma generate
npx prisma db push     # dev (ou migrate)
npx tsx prisma/seed.ts # seed DEMO
npm run dev            # http://localhost:3000
```

## Env (.env.example)
```
DATABASE_URL="postgresql://user:password@localhost:5432/casinoonline?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-me-32chars-min"
DEMO_ADMIN_EMAIL="admin@arena.bet"
DEMO_ADMIN_PASSWORD="Admin123!"
DEMO_USER_EMAIL="demo@arena.bet"
DEMO_USER_PASSWORD="Demo123!"
```

## Contas DEMO
- **User:** demo@arena.bet / Demo123! (saldo R$ 1.000 + R$ 250 bônus)
- **Admin:** admin@arena.bet / Admin123!

## Rotas Principais
- `/` — Home (banner carousel, categorias, eventos)
- `/esportes` — Apostas esportivas + Bet Slip lateral/inferior
- `/cassino` — Grid de jogos
- `/cassino/crash` — Crash demo (multiplicador, cash out, provably fair)
- `/carteira` — Saldo, depósito/saque DEMO (PIX DEMO), histórico
- `/historico` — Tabela com filtros
- `/login` `/cadastro` — Auth demo (Zustand persist)
- `/perfil` — Dados, segurança, preferências
- `/suporte` — Tickets
- `/admin` — Dashboard, /admin/usuarios, /admin/apostas, /admin/jogos, /admin/promocoes

## Funcionalidades DEMO
- Saldo virtual BRL, depósito/saque simulado, histórico
- Bet Slip com cálculo de odd combinada e retorno
- Crash com curva, crash point aleatório e cash out
- Notificações, PWA manifest, SEO (metadata + OG)

## Scripts
```bash
npm run dev
npm run build && npm run start
npm run typecheck
npm run lint
npm run db:studio
```

## Deploy
- Env `DATABASE_URL` e `NEXTAUTH_SECRET` em produção
- `npm run build` gera `.next` standalone

## Notas de Segurança
- Bcrypt para senhas, JWT, validações Zod, Helmet/CORS em API real
- Nenhum secret hardcoded; usar .env
- Jogo responsável + verificação 18+
