import { NextResponse } from 'next/server';
import { getHotels, updateHotel } from '../../route';
import { MenuItem } from '@/app/lib/data';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const hotels = getHotels();
    const hotel = hotels.find(h => h.id === id);

    if (!hotel) {
        return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    }

    const newItem: MenuItem = {
        id: `m${Date.now()}`,
        name: body.name,
        price: Number(body.price),
        description: body.description,
        image: body.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', // Default placeholder
        available: true,
        // kannadaName: body.kannadaName
    };

    const updatedHotel = {
        ...hotel,
        menu: [...hotel.menu, newItem]
    };

    updateHotel(updatedHotel);

    return NextResponse.json(newItem);
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const { itemId, available } = body;

    const hotels = getHotels();
    const hotel = hotels.find(h => h.id === id);

    if (!hotel) return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });

    const updatedHotel = {
        ...hotel,
        menu: hotel.menu.map(m => m.id === itemId ? { ...m, available } : m)
    };

    updateHotel(updatedHotel);

    return NextResponse.json({ success: true });
}
