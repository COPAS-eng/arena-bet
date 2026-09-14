import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!(session?.user as any)?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = (session!.user as any).id as string;
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { wallet: true } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ id: user.id, email: user.email, username: user.username, role: user.role, balance: user.wallet ? Number(user.wallet.balance) : 0, bonusBalance: user.wallet ? Number(user.wallet.bonusBalance) : 0 });
  } catch (error) { return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}
