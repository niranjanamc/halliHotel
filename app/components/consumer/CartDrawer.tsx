"use client";

import { useCart } from '@/app/context/CartContext';
import { ShoppingBag, ChevronUp, ChevronDown, Clock } from 'lucide-react';
import { useState } from 'react';

export default function CartDrawer() {
    const { items, total, scheduledTime, setScheduledTime } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    if (items.length === 0) return null;

    const count = items.reduce((a, b) => a + b.quantity, 0);

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-surface)',
            borderTopLeftRadius: 'var(--radius-lg)',
            borderTopRightRadius: 'var(--radius-lg)',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
            zIndex: 100,
            padding: 'var(--spacing-md)',
            border: '1px solid var(--color-surface-alt)'
        }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ position: 'relative' }}>
                        <ShoppingBag color="var(--color-primary)" />
                        <span style={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            background: 'var(--color-primary)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '18px',
                            height: '18px',
                            fontSize: '0.7rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>{count}</span>
                    </div>
                    <span style={{ fontWeight: 600 }}>Your Order</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>₹{total}</span>
                    {isOpen ? <ChevronDown /> : <ChevronUp />}
                </div>
            </div>

            {isOpen && (
                <div style={{ marginTop: 'var(--spacing-md)', maxHeight: '60vh', overflowY: 'auto' }}>
                    {items.map(item => (
                        <div key={item.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '8px 0',
                            borderBottom: '1px solid var(--color-surface-alt)'
                        }}>
                            <div>
                                <span style={{ fontWeight: 500 }}>{item.quantity}x </span>
                                <span>{item.name}</span>
                            </div>
                            <span>₹{item.price * item.quantity}</span>
                        </div>
                    ))}

                    {/* Time Picker Section */}
                    <div style={{ margin: 'var(--spacing-md) 0', padding: '12px', background: 'var(--color-surface-alt)', borderRadius: 'var(--radius-md)' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                            <Clock size={16} />
                            Pre-order Time
                        </label>
                        <input
                            type="time"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                backgroundColor: 'white'
                            }}
                        />
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                            Select a time for pickup or delivery.
                        </p>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%' }}>
                        Checkout (Phone Number)
                    </button>
                </div>
            )}
        </div>
    );
}
