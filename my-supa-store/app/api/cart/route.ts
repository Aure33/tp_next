import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';
import { cookies } from 'next/headers';

const CART_COOKIE_NAME = 'cart_session_id';

async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(CART_COOKIE_NAME)?.value;
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
  }
  
  return sessionId;
}

export async function GET() {
  const sessionId = await getOrCreateSessionId();
  
  let cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { sessionId },
      include: { items: true },
    });
  }

  const totalCount = cart.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

  return NextResponse.json({ cart, totalCount, totalPrice });
}

export async function POST(request: NextRequest) {
  const sessionId = await getOrCreateSessionId();
  const body = await request.json();
  const { productId, name, price, currency } = body;

  let cart = await prisma.cart.findFirst({
    where: { sessionId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { sessionId },
    });
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        name,
        price,
        currency,
        quantity: 1,
      },
    });
  }

  const updatedCart = await prisma.cart.findFirst({
    where: { sessionId },
    include: { items: true },
  });

  const totalCount = updatedCart!.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
  const totalPrice = updatedCart!.items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

  const response = NextResponse.json({ cart: updatedCart, totalCount, totalPrice });
  response.cookies.set(CART_COOKIE_NAME, sessionId, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
