"use client";

import MerchantItemCard from "@/app/components/merchant/MerchantItemCard";
import AddItemForm from "@/app/components/merchant/AddItemForm";
import { ListChecks } from "lucide-react";
import { useStore } from "@/app/context/StoreContext";
import Link from 'next/link';

export default function MerchantDashboard() {
    const { hotels, loading, toggleAvailability } = useStore();

    // In a real app, this would be determined by the logged-in user's session
    // For this MVP, we'll just pick the last registered hotel to show the flow
    const hotel = hotels.length > 0 ? hotels[hotels.length - 1] : null;

    if (loading) {
        return <div className="container" style={{ paddingTop: '40px' }}>Loading dashboard...</div>;
    }

    if (!hotel) {
        return (
            <div className="container" style={{ padding: '40px', textAlign: 'center' }}>
                <h2>No Hotel Found</h2>
                <p>Please register your hotel first.</p>
                <Link href="/register" className="btn btn-primary" style={{ marginTop: '16px' }}>
                    Register Hotel
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: 'var(--spacing-lg) var(--spacing-md)' }}>
            <header style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Kitchen Manager</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>{hotel.name}</p>
            </header>

            <div style={{
                background: 'var(--color-primary-dark)',
                color: 'white',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--spacing-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <ListChecks size={24} />
                <div>
                    <h2 style={{ fontSize: '1.2rem' }}>New Orders</h2>
                    <p style={{ opacity: 0.9 }}>No active orders right now</p>
                </div>
            </div>

            <AddItemForm hotelId={hotel.id} />

            <section>
                <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.3rem' }}>Menu Availability</h2>
                {hotel.menu.length === 0 ? (
                    <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No items in menu yet.</p>
                ) : (
                    hotel.menu.map(item => (
                        <MerchantItemCard
                            key={item.id}
                            item={item}
                            onToggle={() => toggleAvailability(hotel.id, item.id, !item.available)}
                        />
                    ))
                )}
            </section>
        </div>
    );
}
