import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!(session?.user as any)?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = (session!.user as any).id as string;

    const { type, status, page = '1', limit = '20' } = Object.fromEntries(new URL(req.url).searchParams);
    const pageNum = Math.max(1, Math.min(100, parseInt(page) || 1));
    const limitNum = Math.max(1, Math.min(50, parseInt(limit) || 20));
    const skip = (pageNum - 1) * limitNum;

    const filter: any = { userId };
    if (type) filter.type = type;
    if (status) filter.status = status;

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({ where: filter, skip, take: limitNum, orderBy: { createdAt: 'desc' } }),
      prisma.transaction.count({ where: filter }),
    ]);

    return NextResponse.json({ transactions, total, page: pageNum, limit: limitNum });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!(session?.user as any)?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = (session!.user as any).id as string;

    const body = await req.json();
    const type = String(body.type);
    const amount = Number(body.amount);
    const walletId = String(body.walletId || '');
    const description = body.description ? String(body.description) : undefined;

    if (!type || !walletId || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }
    if (!['DEPOSIT', 'WITHDRAW', 'BET', 'WIN', 'BONUS'].includes(type)) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

    const wallet = await prisma.wallet.findUnique({ where: { id: walletId } });
    if (!wallet) return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    if (wallet.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const balanceBefore = wallet.balance.toNumber();
    const newBalance = type === 'DEPOSIT' || type === 'WIN' || type === 'BONUS' ? balanceBefore + amount : balanceBefore - amount;

    if (newBalance < 0) return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });

    const transaction = await prisma.$transaction(async (tx) => {
      const updatedWallet = await tx.wallet.update({
        where: { id: walletId },
        data: { balance: newBalance, updatedAt: new Date() },
      });
      return await tx.transaction.create({
        data: {
          userId,
          walletId,
          type: type as any,
          amount,
          balanceBefore,
          balanceAfter: newBalance,
          description,
          status: 'COMPLETED',
          processedAt: new Date(),
        },
      });
    });

    return NextResponse.json({ transaction, balance: newBalance });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
