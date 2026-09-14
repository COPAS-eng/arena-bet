import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!(session?.user as any)?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = (session!.user as any).id as string;
    const body = await req.json();
    const type = body.type as string;
    const amount = Number(body.amount);
    if (!['DEPOSIT', 'WITHDRAW'].includes(type)) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    if (!Number.isFinite(amount) || amount <= 0) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    if (amount > 100000) return NextResponse.json({ error: 'Max R$ 100,000' }, { status: 400 });
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    const balanceBefore = wallet.balance.toNumber();
    const newBalance = type === 'DEPOSIT' ? balanceBefore + amount : balanceBefore - amount;
    if (newBalance < 0) return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    const result = await prisma.$transaction(async (tx) => {
      await tx.wallet.update({ where: { id: wallet.id }, data: { balance: newBalance, updatedAt: new Date() } });
      return await tx.transaction.create({ data: { userId, walletId: wallet.id, type: type as any, amount, balanceBefore, balanceAfter: newBalance, description: type === 'DEPOSIT' ? 'Depósito via Pix' : 'Saque via Pix', status: 'COMPLETED', processedAt: new Date() } });
    });
    return NextResponse.json({ balance: newBalance, transaction: result });
  } catch (error) { return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}
