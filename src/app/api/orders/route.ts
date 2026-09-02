import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Generate a random order number like GM-1045
function generateOrderNumber() {
  return `GM-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, orderType, specialInstructions, items, totals } = body;

    // Validate request
    if (!customer?.name || !customer?.phone || !items || items.length === 0) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Save order to Prisma SQLite
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerName: customer.name,
        customerEmail: customer.email || 'no-email@provided.com',
        customerPhone: customer.phone,
        type: orderType,
        specialInstructions,
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        items: {
          create: items.map((item: any) => ({
            productId: item.product.id,
            productName: item.product.name,
            variantName: item.variantLabel,
            price: item.basePrice,
            quantity: item.quantity,
            modifiers: JSON.stringify(item.modifiers),
            specialInstructions: item.specialInstructions,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, orderId: order.id, orderNumber: order.orderNumber });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ message: 'Internal server error processing order' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
