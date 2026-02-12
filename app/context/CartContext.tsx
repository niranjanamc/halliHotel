"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '@/app/lib/data';

type CartItem = MenuItem & { quantity: number };

interface CartContextType {
    items: CartItem[];
    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    total: number;
    scheduledTime: string;
    setScheduledTime: (time: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [scheduledTime, setScheduledTime] = useState('');

    const addToCart = (item: MenuItem) => {
        setItems(current => {
            const existing = current.find(i => i.id === item.id);
            if (existing) {
                return current.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...current, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: string) => {
        setItems(current => {
            const existing = current.find(i => i.id === itemId);
            if (existing && existing.quantity > 1) {
                return current.map(i =>
                    i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
                );
            }
            return current.filter(i => i.id !== itemId);
        });
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, scheduledTime, setScheduledTime }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
