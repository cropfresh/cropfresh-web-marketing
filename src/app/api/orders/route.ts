import { NextResponse } from 'next/server';

// Mock data for hackathon demo
let orders = [
  {
    id: 'ORD-1001',
    buyerId: 'buyer-mock-1',
    listingId: 'L001',
    commodity: 'Tomato',
    quantityKg: 50,
    amount: 1425, // 50 * 28.5
    status: 'pickup_scheduled',
    deliveryAddress: 'Hotel Nandini, MG Road, Bengaluru',
    pickupAddress: 'Farm 12, Kolar',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'ORD-1002',
    buyerId: 'buyer-mock-2',
    listingId: 'L002',
    commodity: 'Onion',
    quantityKg: 100,
    amount: 3500,
    status: 'in_transit',
    deliveryAddress: 'FreshMart VIP Market, Mysuru',
    pickupAddress: 'Farm 4, Chikkaballapur',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const buyerId = searchParams.get('buyerId');
    
    let filteredOrders = orders;
    
    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status);
    }
    
    if (buyerId) {
      filteredOrders = filteredOrders.filter(o => o.buyerId === buyerId);
    }
    
    return NextResponse.json({
      success: true,
      data: filteredOrders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.listingId || !data.buyerId || !data.quantityKg) {
      return NextResponse.json(
        { error: 'listingId, buyerId, and quantityKg are required' },
        { status: 400 }
      );
    }

    const newOrder = {
      id: `ORD-100${orders.length + 3}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    
    orders = [newOrder, ...orders];
    
    return NextResponse.json(
      { success: true, data: newOrder },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { orderId, new_status } = data;
    
    if (!orderId || !new_status) {
      return NextResponse.json(
        { error: 'orderId and new_status are required' },
        { status: 400 }
      );
    }

    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: new_status,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: orders[orderIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
