"use client";
import { MenuItem } from '@/app/lib/data';
import { ToggleLeft, ToggleRight } from 'lucide-react';

export default function MerchantItemCard({ item, onToggle }: { item: MenuItem, onToggle: () => void }) {
    const isAvailable = item.available;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--spacing-md)',
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-sm)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-surface-alt)',
            opacity: isAvailable ? 1 : 0.6
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }}
                />
                <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '2px' }}>{item.name}</h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>₹{item.price}</span>
                </div>
            </div>

            <button
                onClick={onToggle}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isAvailable ? 'var(--color-success)' : 'var(--color-text-muted)'
                }}
            >
                {isAvailable ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
        </div>
    );
}
