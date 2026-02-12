"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Hotel, MenuItem, MOCK_HOTELS } from '@/app/lib/data';

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

    // Initial Data Load (Simulated)
    useEffect(() => {
        // In a real app, we'd fetch from API
        // For GitHub Pages static demo, we use local mock data
        // Simulate network delay
        const demoData = [...MOCK_HOTELS];
        setTimeout(() => {
            setHotels(demoData);
            setLoading(false);
        }, 500);
    }, []);

    const addHotel = async (hotelData: Omit<Hotel, 'id' | 'menu'>) => {
        // Client-side simulation
        const newHotel: Hotel = {
            id: `h${Date.now()}`,
            name: hotelData.name,
            location: hotelData.location,
            menu: []
        };
        setHotels(current => [...current, newHotel]);
    };

    const addItemToHotel = async (hotelId: string, itemData: Omit<MenuItem, 'id'>) => {
        // Client-side simulation
        const newItem: MenuItem = {
            id: `m${Date.now()}`,
            ...itemData
        };

        setHotels(current => current.map(h => {
            if (h.id === hotelId) {
                return { ...h, menu: [...h.menu, newItem] };
            }
            return h;
        }));
    };

    const toggleAvailability = async (hotelId: string, itemId: string, available: boolean) => {
        // Client-side simulation
        setHotels(current => current.map(h => {
            if (h.id === hotelId) {
                return {
                    ...h,
                    menu: h.menu.map(m => m.id === itemId ? { ...m, available } : m)
                };
            }
            return h;
        }));
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
