"use client";

import { use, useEffect, useState } from 'react';
import { Crown, Info } from "lucide-react";
import MenuGrid from "@/app/components/consumer/MenuGrid";
import CartDrawer from "@/app/components/consumer/CartDrawer";
import { useStore } from "@/app/context/StoreContext";
import { Hotel } from "@/app/lib/data";

export default function HotelPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use()
    const { id } = use(params);
    const { hotels, loading } = useStore();
    const [hotel, setHotel] = useState<Hotel | null>(null);

    useEffect(() => {
        if (!loading && hotels.length > 0) {
            const found = hotels.find(h => h.id === id);
            setHotel(found || null);
        }
    }, [hotels, loading, id]);

    if (loading) {
        return <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>Loading menu...</div>;
    }

    if (!hotel) {
        return <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>Hotel not found.</div>;
    }

    // Filter available items only for consumer view
    const availableItems = hotel.menu.filter(item => item.available);

    return (
        <div className="container" style={{ paddingBottom: '100px' }}>
            {/* Header / Hero */}
            <header style={{
                padding: 'var(--spacing-lg) 0',
                borderBottom: '1px solid var(--color-surface-alt)',
                marginBottom: 'var(--spacing-lg)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Crown color="var(--color-primary)" size={24} />
                    <h1 style={{ fontSize: '1.2rem', color: 'var(--color-text-main)' }}>
                        HalliHotel
                    </h1>
                </div>

                <div className="card" style={{ background: 'var(--color-surface-alt)', border: 'none' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{hotel.name}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)' }}>
                        <Info size={16} />
                        <span style={{ fontSize: '0.9rem' }}>{hotel.location}</span>
                    </div>
                </div>
            </header>

            <main>
                <MenuGrid category="Menu" items={availableItems} />

                {availableItems.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', margin: '40px 0' }}>
                        Sorry, the kitchen is currently closed or busy.
                    </p>
                )}
            </main>

            <CartDrawer />
        </div>
    );
}
