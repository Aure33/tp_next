import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;
  const body = await request.json();
  const { quantity, cartId } = body;

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: true },
  });

  const totalCount = cart!.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart!.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return NextResponse.json({ totalCount, totalPrice });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;
  const { searchParams } = new URL(request.url);
  const cartId = searchParams.get('cartId');

  await prisma.cartItem.delete({
    where: { id: itemId },
  });

  if (cartId) {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });

    if (cart) {
      const totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return NextResponse.json({ totalCount, totalPrice });
    }
  }

  return NextResponse.json({ totalCount: 0, totalPrice: 0 });
}
