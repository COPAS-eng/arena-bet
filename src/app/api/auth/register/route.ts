import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email, username, password } = await req.json();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !username || !password) return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    if (!emailRegex.test(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    if (username.trim().length < 3) return NextResponse.json({ error: 'Username must be 3+ characters' }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: 'Password must be 8+ characters' }, { status: 400 });
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return NextResponse.json({ error: 'Password must have 1 uppercase and 1 number' }, { status: 400 });
    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    const hashedPassword = await bcrypt.hash(password, 12);
    const referralCode = randomUUID().slice(0, 8).toUpperCase();
    const user = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({ data: { email, username, passwordHash: hashedPassword, referralCode } });
      await tx.wallet.create({ data: { userId: u.id, balance: 1000, bonusBalance: 250 } });
      return u;
    });
    return NextResponse.json({ id: user.id, email: user.email, username: user.username, role: user.role }, { status: 201 });
  } catch (error: any) {
    if (error?.code === 'P2002') return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
