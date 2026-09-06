# Casino Online - Especificação Completa

## 1. Objetivo

**O que estamos construindo:** Um clone completo de cassino online inspirado no Blaze.bet, com jogos de crash, double, mines, slots, sistema de usuários, carteira, apostas em tempo real e painel administrativo.

**Público-alvo:** Estudantes/desenvolvedores para fins educacionais - aprendizado de Next.js, Prisma, WebSockets, arquitetura de jogos de azar, sistemas de pagamento, segurança.

**Critérios de sucesso:**
- ✅ Usuários podem se registrar, fazer login, depositar/sacar (simulado)
- ✅ Jogos funcionais: Crash, Double, Mines, Slots
- ✅ Sistema de apostas em tempo real com WebSockets
- ✅ Histórico de apostas e provably fair
- ✅ Painel admin com gestão de usuários, jogos, configurações
- ✅ Testes automatizados (unit, integration, e2e)
- ✅ Deploy ready (Docker, CI/CD)

---

## 2. Stack Tecnológico & Comandos

### Stack Principal
- **Framework:** Next.js 14+ (App Router, React 18, TypeScript)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js v5 (credentials + OAuth opcional)
- **Real-time:** Socket.io (WebSockets para jogos ao vivo)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand (client) + React Query (server)
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest (unit), Playwright (e2e)
- **Lint/Format:** ESLint + Prettier + Husky

### Comandos Executáveis
```bash
# Desenvolvimento
npm run dev                    # Inicia dev server (Next.js + Socket.io)
npm run db:push               # Push schema para DB (dev)
npm run db:studio             # Abre Prisma Studio
npm run db:seed               # Popula DB com dados de teste

# Qualidade
npm run lint                  # ESLint
npm run lint:fix              # ESLint --fix
npm run typecheck             # tsc --noEmit
npm run format                # Prettier --write
npm run test                  # Vitest (unit/integration)
npm run test:ui               # Vitest UI
npm run test:e2e              # Playwright
npm run test:coverage         # Coverage report

# Build & Deploy
npm run build                 # Next.js build
npm run start                 # Production server
npm run docker:build          # Build Docker image
npm run docker:up             # Docker compose up
```

---

## 3. Estrutura do Projeto

```
casinoonline/
├── .github/
│   └── workflows/           # CI/CD pipelines
├── prisma/
│   ├── schema.prisma        # Schema principal
│   ├── migrations/          # Migrações
│   └── seed.ts              # Seed data
├── public/                  # Assets estáticos
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # Route group: login, register
│   │   ├── (dashboard)/    # Route group: user dashboard
│   │   ├── (games)/        # Route group: páginas dos jogos
│   │   ├── (admin)/        # Route group: painel admin
│   │   ├── api/            # API Routes
│   │   │   ├── auth/       # NextAuth endpoints
│   │   │   ├── games/      # Game endpoints
│   │   │   ├── wallet/     # Wallet endpoints
│   │   │   ├── bets/       # Betting endpoints
│   │   │   └── admin/      # Admin endpoints
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── games/          # Componentes específicos dos jogos
│   │   ├── layout/         # Header, Footer, Sidebar
│   │   ├── wallet/         # Deposit, Withdraw, Balance
│   │   ├── bets/           # Bet history, slip, controls
│   │   └── admin/          # Admin components
│   ├── lib/
│   │   ├── auth.ts         # NextAuth config
│   │   ├── prisma.ts       # Prisma client singleton
│   │   ├── socket.ts       # Socket.io server/client
│   │   ├── utils.ts        # Utilitários gerais
│   │   ├── validations/    # Zod schemas
│   │   ├── game-logic/     # Lógica dos jogos (provably fair)
│   │   └── constants/      # Constantes da aplicação
│   ├── hooks/              # Custom React hooks
│   ├── stores/             # Zustand stores
│   ├── types/              # TypeScript types
│   └── styles/             # Globals, Tailwind config
├── tests/
│   ├── unit/               # Testes unitários
│   ├── integration/        # Testes de integração
│   └── e2e/                # Playwright tests
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── docker-compose.dev.yml
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  USER
  ADMIN
  MODERATOR
}

enum TransactionType {
  DEPOSIT
  WITHDRAW
  BET
  WIN
  BONUS
  REFUND
}

enum TransactionStatus {
  PENDING
  COMPLETED
  FAILED
  CANCELLED
}

enum GameType {
  CRASH
  DOUBLE
  MINES
  SLOTS
}

enum BetStatus {
  ACTIVE
  WON
  LOST
  CASHED_OUT
  CANCELLED
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  username      String    @unique
  passwordHash  String
  role          UserRole  @default(USER)
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastLoginAt   DateTime?

  // Relations
  wallet        Wallet?
  bets          Bet[]
  transactions  Transaction[]
  sessions      Session[]
  gameSeeds     GameSeed[]
  referralCode  String?   @unique
  referredBy    String?
  referrals     User[]    @relation("Referral")
  referrer      User?     @relation("Referral" fields: [referredBy] references: [referralCode])
  
  @@index([email])
  @@index([username])
  @@index([referralCode])
}

model Wallet {
  id        String   @id @default(cuid())
  userId    String   @unique
  balance   Decimal  @default(0) @db.Decimal(18, 8)
  bonusBalance Decimal @default(0) @db.Decimal(18, 8)
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions Transaction[]

  @@index([userId])
}

model Transaction {
  id          String            @id @default(cuid())
  userId      String
  walletId    String
  type        TransactionType
  status      TransactionStatus @default(PENDING)
  amount      Decimal           @db.Decimal(18, 8)
  balanceBefore Decimal         @db.Decimal(18, 8)
  balanceAfter  Decimal         @db.Decimal(18, 8)
  description String?
  metadata    Json?
  processedAt DateTime?
  createdAt   DateTime          @default(now())

  user        User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  wallet      Wallet            @relation(fields: [walletId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([walletId])
  @@index([type, status])
  @@index([createdAt])
}

model Bet {
  id            String     @id @default(cuid())
  userId        String
  gameType      GameType
  gameRoundId   String
  amount        Decimal    @db.Decimal(18, 8)
  currency      String     @default("BRL")
  status        BetStatus  @default(ACTIVE)
  payout        Decimal?   @db.Decimal(18, 8)
  multiplier    Decimal?   @db.Decimal(18, 8)
  clientSeed    String?
  serverSeed    String?
  nonce         Int?
  result        Json?
  cashedOutAt   DateTime?
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  gameRound     GameRound  @relation(fields: [gameRoundId], references: [id])

  @@index([userId])
  @@index([gameRoundId])
  @@index([gameType, status])
  @@index([createdAt])
}

model GameRound {
  id            String   @id @default(cuid())
  gameType      GameType
  roundNumber   BigInt   @unique
  serverSeed    String
  serverSeedHash String
  clientSeed    String?
  nonce         Int      @default(0)
  result        Json
  startedAt     DateTime @default(now())
  endedAt       DateTime?
  isFinished    Boolean  @default(false)

  bets          Bet[]

  @@index([gameType, roundNumber])
  @@index([isFinished])
}

model GameSeed {
  id          String   @id @default(cuid())
  userId      String
  gameType    GameType
  clientSeed  String
  serverSeed  String
  nonce       Int      @default(0)
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, gameType])
  @@index([userId])
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([token])
}

model GameConfig {
  id            String   @id @default(cuid())
  gameType      GameType @unique
  config        Json     // Configurações específicas do jogo
  houseEdge     Float    @default(0.01) // 1% house edge
  minBet        Decimal  @db.Decimal(18, 8)
  maxBet        Decimal  @db.Decimal(18, 8)
  maxPayout     Decimal  @db.Decimal(18, 8)
  isActive      Boolean  @default(true)
  updatedAt     DateTime @updatedAt
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String
  entity    String
  entityId  String?
  oldData   Json?
  newData   Json?
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([entity, entityId])
  @@index([createdAt])
}
```

---

## 5. Funcionalidades Principais

### 5.1 Autenticação & Usuários
- **Registro:** Email, username, senha (bcrypt/argon2), verificação de email opcional
- **Login:** Credentials (NextAuth), session JWT em httpOnly cookie
- **Recuperação de senha:** Token JWT com expiração
- **Perfil:** Avatar, username, email, 2FA (TOTP opcional)
- **Referral:** Código único, comissão configurável

### 5.2 Carteira (Wallet)
- **Saldo real:** BRL (Decimal 18,8)
- **Saldo bônus:** Separado, com requisitos de rollover
- **Depósito:** Simulado (PIX, Crypto, Cartão) - webhook mock
- **Saque:** Com validação de KYC simulado, limites diários
- **Histórico:** Paginação, filtros, export CSV

### 5.3 Jogos (Provably Fair)

#### Crash Game
- Multiplicador começa em 1.00x, cresce exponencialmente
- "Crash" em ponto aleatório (provably fair)
- Auto cash-out configurável
- Histórico de rodadas com seed verification

#### Double (Roleta Simplificada)
- 15 slots: 7 Vermelho, 7 Preto, 1 Branco (14x)
- Apostas: Cor (2x), Branco (14x), Par/Ímpar (2x)
- Animação de roleta com WebSocket

#### Mines
- Grid 5x5 (25 células)
- Usuário escolhe quantidade de minas (1-24)
- Revela células, multiplicador aumenta
- Cash out a qualquer momento

#### Slots
- 5 reels x 3 rows
- 20 paylines fixas
- Símbolos: Wild, Scatter, High, Low
- Free spins, bonus rounds
- RTP configurável (94-98%)

### 5.4 Sistema de Apostas em Tempo Real
- **Socket.io** para sincronização multiplayer
- Estados: `betting` → `playing` → `finished`
- Broadcast: novo round, apostas de outros jogadores, resultados
- Reconnection handling

### 5.5 Provably Fair System
```
Server Seed (SHA256) → Hash publicado ANTES da aposta
Client Seed → Escolhido pelo usuário
Nonce → Incremental por rodada
Resultado = HMAC_SHA256(serverSeed, clientSeed + ":" + nonce)
```
- Verificação client-side
- Seed rotation automática

### 5.6 Painel Administrativo
- **Dashboard:** Métricas em tempo real (usuários online, volume, receita)
- **Usuários:** Listagem, busca, edição, banimento, ajuste de saldo
- **Jogos:** Configuração (house edge, limites), ativação/desativação
- **Transações:** Aprovação de saques, logs de depósitos
- **Auditoria:** Logs completos de ações administrativas
- **Relatórios:** Revenue, GGR, NGR, retenção, LTV

---

## 6. Segurança & Compliance

### Sempre Fazer (Always Do)
- ✅ Validar TODAS as inputs com Zod (client + server)
- ✅ Rate limiting: API (100 req/min), Auth (5 req/min), Bets (10 req/min)
- ✅ CSP headers, HSTS, X-Frame-Options
- ✅ Senhas: Argon2id (memory-hard)
- ✅ Secrets em .env apenas, nunca no código
- ✅ Auditoría de ações sensíveis (admin, wallet, bets)
- ✅ Provably fair verification endpoint público
- ✅ HTTPS only em produção

### Perguntar Primeiro (Ask First)
- 🤔 Mudanças no schema do banco (migrações)
- 🤔 Novas dependências npm
- 🤔 Configuração de CI/CD
- 🤔 Integração com provedores de pagamento reais

### Nunca Fazer (Never Do)
- ❌ Commitar secrets, chaves, .env
- ❌ Editar node_modules ou .prisma/client
- ❌ Remover testes falhando sem aprovação
- ❌ Logar dados sensíveis (senhas, seeds, tokens)
- ❌ Expor stack traces em produção

---

## 7. Code Style & Convenções

### TypeScript
```typescript
// Tipos estritos, no any
interface BetInput {
  gameType: GameType;
  amount: number; // Em centavos (integer)
  autoCashout?: number; // Multiplicador (ex: 2.5)
  clientSeed?: string;
}

// Validação com Zod
const betSchema = z.object({
  gameType: z.nativeEnum(GameType),
  amount: z.number().int().positive().max(10_000_00), // Max 1000 BRL
  autoCashout: z.number().min(1.01).max(1000).optional(),
  clientSeed: z.string().min(1).max(64).optional(),
});
```

### React Components
```tsx
// Server Component por default
export default async function GamePage({ params }: { params: { game: GameType } }) {
  const config = await getGameConfig(params.game);
  return <GameClient config={config} />;
}

// Client Component marcado explicitamente
"use client";
export function GameClient({ config }: { config: GameConfig }) {
  const { placeBet } = useBetting();
  return <Button onClick={() => placeBet(100)}>Apostar</Button>;
}
```

### API Routes
```typescript
// src/app/api/games/crash/bet/route.ts
export async function POST(req: Request) {
  const session = await auth();
  if (!session) return unauthorized();
  
  const body = await req.json();
  const parsed = betSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error);
  
  const bet = await placeBet(session.user.id, parsed.data);
  return success(bet);
}
```

---

## 8. Estratégia de Testes

| Nível | Ferramenta | Cobertura | O quê |
|-------|------------|-----------|-------|
| Unit | Vitest | 80%+ | Game logic, utils, validations, provably fair |
| Integration | Vitest | 60%+ | API routes, database operations, auth |
| E2E | Playwright | Critical paths | Registration, deposit, play crash, withdraw, admin |

### Testes Críticos (Must Pass)
- Provably fair verification matematicamente correta
- Race conditions em apostas simultâneas
- Saldo da carteira nunca negativo
- Seed rotation funciona
- Admin não pode ver seeds não revelados

---

## 9. Fases de Implementação

### Fase 1: Fundação (Semana 1)
- [ ] Setup Next.js + TypeScript + Tailwind + shadcn/ui
- [ ] Prisma schema + PostgreSQL (Docker)
- [ ] NextAuth (credentials) + middleware de proteção
- [ ] Layout base: Header, Footer, Theme toggle
- [ ] Landing page responsiva

### Fase 2: Auth & Wallet (Semana 2)
- [ ] Registro/Login/Logout + validação
- [ ] Wallet: saldo, histórico, transações
- [ ] Depósito/Simulação (mock PIX/Crypto)
- [ ] Saque com validações

### Fase 3: Crash Game (Semana 3)
- [ ] Game logic: provably fair, crash point calculation
- [ ] WebSocket server: round states, broadcast
- [ ] Frontend: Gráfico do multiplicador (Canvas/SVG)
- [ ] Auto cash-out, bet history, seed verification

### Fase 4: Double Game (Semana 4)
- [ ] Lógica da roleta + animação
- [ ] WebSocket sync
- [ ] Apostas: cor, branco, par/ímpar

### Fase 5: Mines Game (Semana 5)
- [ ] Grid 5x5, mine placement (provably fair)
- [ ] Multiplier calculation
- [ ] Cash out mechanics

### Fase 6: Slots (Semana 6)
- [ ] Reel spinning animation
- [ ] Payline evaluation
- [ ] Bonus features (free spins, wilds)

### Fase 7: Admin Panel (Semana 7)
- [ ] Dashboard com métricas
- [ ] User management
- [ ] Game configuration
- [ ] Transaction approval
- [ ] Audit logs

### Fase 8: Polish & Deploy (Semana 8)
- [ ] Testes completos
- [ ] Docker + Docker Compose
- [ ] CI/CD (GitHub Actions)
- [ ] Documentação
- [ ] Performance optimization

---

## 10. Riscos & Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Complexidade WebSocket | Alta | Alto | Começar simples, testar cedo |
| Race conditions bets | Média | Crítico | Transações DB + locks otimistas |
| Provably fair bugs | Baixa | Crítico | Testes matemáticos exaustivos |
| Performance slots | Média | Médio | Web Workers para cálculos |
| Scope creep | Alta | Médio | Spec frozen após aprovação |

---

## 11. Aprovação Necessária

Antes de iniciar a implementação, preciso da sua confirmação em:

1. **Schema do banco** - Está completo ou quer ajustar campos?
2. **Jogos prioritários** - Ordem: Crash → Double → Mines → Slots OK?
3. **Autenticação** - Apenas credentials ou adicionar OAuth (Google/GitHub)?
4. **Moeda** - Apenas BRL ou multi-moeda (USD, EUR, Crypto)?
5. **Deploy target** - Vercel + Railway/Neon ou VPS + Docker?
6. **Mock payments** - Simular PIX/Crypto ou integrar sandbox real (Stripe/Mercado Pago)?

---

**Próximo passo:** Após sua aprovação, criarei o `tasks/plan.md` com breakdown detalhado e começarei a Fase 1.