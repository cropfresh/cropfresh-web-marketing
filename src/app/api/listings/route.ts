import { NextResponse } from 'next/server';

// In-memory array to simulate database for hackathon
let listings = [
  {
    id: 'L001',
    farmerId: 'farmer-mock',
    commodity: 'Tomato',
    quantityKg: 50,
    qualityGrade: 'A',
    askingPricePerKg: 28.5,
    location: 'Kolar',
    status: 'active',
    expiresAt: new Date(Date.now() + 86400000 * 3).toISOString(), // +3 days
    createdAt: new Date().toISOString(),
  },
  {
    id: 'L002',
    farmerId: 'farmer-mock-2',
    commodity: 'Onion',
    quantityKg: 200,
    qualityGrade: 'B',
    askingPricePerKg: 35.0,
    location: 'Chikkaballapur',
    status: 'active',
    expiresAt: new Date(Date.now() + 86400000 * 5).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'L003',
    farmerId: 'farmer-mock-3',
    commodity: 'Potato',
    quantityKg: 150,
    qualityGrade: 'A',
    askingPricePerKg: 22.0,
    location: 'Hassan',
    status: 'active',
    expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
    createdAt: new Date().toISOString(),
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';
    const farmerId = searchParams.get('farmerId');
    
    let filteredListings = listings;
    
    if (status) {
      filteredListings = filteredListings.filter(l => l.status === status);
    }
    
    if (farmerId) {
      filteredListings = filteredListings.filter(l => l.farmerId === farmerId);
    }
    
    return NextResponse.json({
      success: true,
      data: filteredListings,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const newListing = {
      id: `L00${listings.length + 1}`,
      farmerId: data.farmerId || 'mock-farmer',
      commodity: data.commodity,
      quantityKg: data.quantityKg,
      // Mock grade and price if not provided by AI
      qualityGrade: data.qualityGrade || 'A',
      askingPricePerKg: data.askingPricePerKg || Math.floor(Math.random() * 30) + 10,
      location: data.location || 'Unknown',
      status: 'active',
      expiresAt: new Date(Date.now() + 86400000 * 3).toISOString(),
      createdAt: new Date().toISOString(),
      ...data
    };
    
    listings = [newListing, ...listings];
    
    return NextResponse.json(
      { success: true, data: newListing },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}
