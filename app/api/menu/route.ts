import { NextResponse } from 'next/server';
import { MOCK_HOTELS, MenuItem } from '@/app/lib/data';

// In-memory store for the session
let hotels = [...MOCK_HOTELS];

export async function GET() {
    return NextResponse.json(hotels);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { hotelId, itemId, available } = body;

    hotels = hotels.map(hotel => {
        if (hotel.id === hotelId) {
            return {
                ...hotel,
                menu: hotel.menu.map(item =>
                    item.id === itemId ? { ...item, available } : item
                )
            };
        }
        return hotel;
    });

    return NextResponse.json({ success: true, hotels });
}
