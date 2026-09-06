import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding DEMO data...");

  const adminPass = await bcrypt.hash(process.env.DEMO_ADMIN_PASSWORD || "Admin123!", 10);
  const demoPass = await bcrypt.hash(process.env.DEMO_USER_PASSWORD || "Demo123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@arena.bet" },
    update: {},
    create: {
      email: "admin@arena.bet",
      username: "admin",
      passwordHash: adminPass,
      role: "ADMIN",
      referralCode: "ADMIN001",
    },
  });

  const demo = await prisma.user.upsert({
    where: { email: "demo@arena.bet" },
    update: {},
    create: {
      email: "demo@arena.bet",
      username: "demo",
      passwordHash: demoPass,
      role: "USER",
      referralCode: "DEMO001",
    },
  });

  for (const u of [admin, demo]) {
    await prisma.wallet.upsert({
      where: { userId: u.id },
      update: {},
      create: { userId: u.id, balance: 1000, bonusBalance: 250 },
    });
  }

  const games = [
    { name: "Crash", slug: "crash", category: "Crash", image: "/games/crash.png", isPopular: true },
    { name: "Double", slug: "double", category: "Roleta", image: "/games/double.png", isPopular: true },
    { name: "Mines", slug: "mines", category: "Mines", image: "/games/mines.png", isNew: true },
    { name: "Fortune Slots", slug: "fortune-slots", category: "Slots", image: "/games/slots.png" },
  ];
  for (const g of games) {
    await prisma.game.upsert({ where: { slug: g.slug }, update: {}, create: g });
  }

  await prisma.promotion.upsert({
    where: { id: "promo1" },
    update: {},
    create: {
      id: "promo1",
      title: "Bônus de Boas-Vindas",
      description: "100% até R$500 DEMO",
      image: "/promos/welcome.png",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 86400000),
    },
  });

  console.log("Seed done:", { admin: admin.email, demo: demo.email });
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
