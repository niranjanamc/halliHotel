import Link from 'next/link';
import { Hotel } from '@/app/lib/data';
import { MapPin, ArrowRight } from 'lucide-react';

export default function HotelCard({ hotel }: { hotel: Hotel }) {
    // Use first item image as cover if available, else placeholder
    const coverImage = hotel.menu[0]?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c';

    return (
        <Link href={`/hotel/${hotel.id}`}>
            <div className="card" style={{
                padding: 0,
                overflow: 'hidden',
                marginBottom: 'var(--spacing-md)',
                transition: 'transform 0.2s',
                display: 'block',
                textDecoration: 'none',
                color: 'inherit'
            }}>
                <div style={{ height: '140px', background: '#eee' }}>
                    <img src={coverImage} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 'var(--spacing-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{hotel.name}</h3>
                        <ArrowRight size={18} color="var(--color-primary)" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)' }}>
                        <MapPin size={16} />
                        <span style={{ fontSize: '0.9rem' }}>{hotel.location}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
