"use client";

import { MenuItem } from '@/app/lib/data';
import { useCart } from '@/app/context/CartContext';
import { Plus, Minus } from 'lucide-react';

export default function MenuItemCard({ item }: { item: MenuItem }) {
    const { addToCart, removeFromCart, items } = useCart();
    const cartItem = items.find(i => i.id === item.id);
    const quantity = cartItem?.quantity || 0;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-surface-alt)'
        }}>
            <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                    padding: '24px 16px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}>
                    {item.kannadaName && (
                        <span style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'white',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                            opacity: 0.95
                        }}>
                            {item.kannadaName}
                        </span>
                    )}
                </div>
            </div>

            <div style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                        {item.name}
                    </h3>
                    <span style={{
                        background: 'var(--color-surface-alt)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        fontWeight: 700
                    }}>
                        ₹{item.price}
                    </span>
                </div>



                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '16px', flex: 1 }}>
                    {item.description}
                </p>

                {quantity === 0 ? (
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '10px' }}
                        onClick={() => addToCart(item)}
                    >
                        Add +
                    </button>
                ) : (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'var(--color-surface-alt)',
                        borderRadius: 'var(--radius-md)',
                        padding: '4px'
                    }}>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-error)' }}
                        >
                            <Minus size={18} />
                        </button>
                        <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{quantity}</span>
                        <button
                            onClick={() => addToCart(item)}
                            style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-success)' }}
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
