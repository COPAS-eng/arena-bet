import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email, username, password } = await req.json();
    if (!email || !username || !password) return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: 'Password must be 8+ characters' }, { status: 400 });
    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    const hashedPassword = await bcrypt.hash(password, 12);
    const referralCode = randomUUID().slice(0, 8).toUpperCase();
    const user = await prisma.user.create({ data: { email, username, passwordHash: hashedPassword, referralCode } });
    await prisma.wallet.create({ data: { userId: user.id } });
    return NextResponse.json({ id: user.id, email: user.email, username: user.username, role: user.role }, { status: 201 });
  } catch (error) { return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}
