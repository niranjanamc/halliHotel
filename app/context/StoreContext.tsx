"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Hotel, MenuItem } from '@/app/lib/data';

interface StoreContextType {
    hotels: Hotel[];
    loading: boolean;
    addHotel: (hotel: Omit<Hotel, 'id' | 'menu'>) => Promise<void>;
    addItemToHotel: (hotelId: string, item: Omit<MenuItem, 'id'>) => Promise<void>;
    toggleAvailability: (hotelId: string, itemId: string, available: boolean) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);

    // Initial Fetch
    useEffect(() => {
        fetch('/api/hotels')
            .then(res => res.json())
            .then(data => {
                setHotels(data);
                setLoading(false);
            })
            .catch(err => console.error('Failed to fetch hotels', err));
    }, []);

    const addHotel = async (hotelData: Omit<Hotel, 'id' | 'menu'>) => {
        // Optimistic Update can be tricky for ID generation, so we wait for server response
        try {
            const res = await fetch('/api/hotels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hotelData)
            });
            const newHotel = await res.json();
            setHotels(current => [...current, newHotel]);
        } catch (error) {
            console.error('Failed to add hotel', error);
        }
    };

    const addItemToHotel = async (hotelId: string, itemData: Omit<MenuItem, 'id'>) => {
        try {
            const res = await fetch(`/api/hotels/${hotelId}/menu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });
            const newItem = await res.json();

            setHotels(current => current.map(h => {
                if (h.id === hotelId) {
                    return { ...h, menu: [...h.menu, newItem] };
                }
                return h;
            }));
        } catch (error) {
            console.error('Failed to add item', error);
        }
    };

    const toggleAvailability = async (hotelId: string, itemId: string, available: boolean) => {
        // Optimistic update
        setHotels(current => current.map(h => {
            if (h.id === hotelId) {
                return {
                    ...h,
                    menu: h.menu.map(m => m.id === itemId ? { ...m, available } : m)
                };
            }
            return h;
        }));

        try {
            await fetch(`/api/hotels/${hotelId}/menu`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId, available })
            });
        } catch (error) {
            console.error('Failed to update availability', error);
        }
    };

    return (
        <StoreContext.Provider value={{ hotels, loading, addHotel, addItemToHotel, toggleAvailability }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
