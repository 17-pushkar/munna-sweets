import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type CartItem = {
  slug: string;
  quantity: number;
  weight: string;
  price: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        totalAmount: Number(body.totalAmount),
        customer: {
          create: {
            name: String(body.name),
            phone: String(body.phone),
            address: String(body.address),
          },
        },
        items: {
          create: body.items.map((item: CartItem) => ({
            quantity: Number(item.quantity),
            weight: String(item.weight),
            price: Number(item.price),
            product: {
              connect: {
                slug: String(item.slug),
              },
            },
          })),
        },
      },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("ORDER_API_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Order failed" },
      { status: 500 }
    );
  }
}