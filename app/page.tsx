"use client";

import { useStore } from "@/app/context/StoreContext";
import HotelCard from "@/app/components/consumer/HotelCard";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { hotels, loading } = useStore();

  return (
    <div className="container" style={{ padding: 'var(--spacing-lg) var(--spacing-md) 100px' }}>
      <header style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '1.8rem' }}>HalliHotel</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Find food near you</p>
        </div>
        <Link href="/register" style={{ color: 'var(--color-primary)' }}>
          <PlusCircle size={24} />
        </Link>
      </header>

      {loading ? (
        <p>Loading hotels...</p>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}

          {hotels.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <h3>No Hotels Found</h3>
              <p style={{ marginBottom: '16px', color: 'var(--color-text-muted)' }}>Be the first to join!</p>
              <Link href="/register" className="btn btn-primary">
                Register Hotel
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
