import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    return NextResponse.json({ id: user.id, email: user.email, username: user.username, role: user.role });
  } catch (error) { return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}
export async function GET(req: NextRequest) {
  try { const session = await auth(); if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); return NextResponse.json({ user: session.user }); } catch (error) { return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}
