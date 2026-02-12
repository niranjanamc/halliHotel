import { NextResponse } from 'next/server';
import { MOCK_HOTELS, Hotel } from '@/app/lib/data';

// In-memory store (simulating DB)
// Note: In production this would be Supabase/Postgres
let hotels: Hotel[] = [...MOCK_HOTELS];

export async function GET() {
    return NextResponse.json(hotels);
}

export async function POST(request: Request) {
    const body = await request.json();

    const newHotel: Hotel = {
        id: `h${hotels.length + 1}`,
        name: body.name,
        location: body.location,
        menu: [] // Start with empty menu
        // image: body.image (ToDo: handle image upload)
    };

    hotels.push(newHotel);
    return NextResponse.json(newHotel);
}

// Helper to access hotels from other routes (simulated shared state)
// In real app, we'd query DB
export function getHotels() { return hotels; }
export function updateHotel(updated: Hotel) {
    hotels = hotels.map(h => h.id === updated.id ? updated : h);
}
