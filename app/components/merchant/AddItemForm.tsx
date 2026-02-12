"use client";

import { useState } from 'react';
import { useStore } from '@/app/context/StoreContext';
import { Plus } from 'lucide-react';

export default function AddItemForm({ hotelId }: { hotelId: string }) {
    const { addItemToHotel } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        kannadaName: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.price) return;

        await addItemToHotel(hotelId, {
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
            image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
            available: true,
            kannadaName: formData.kannadaName
        });

        setFormData({ name: '', price: '', description: '', image: '', kannadaName: '' });
        setIsOpen(false);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}
            >
                <Plus size={20} />
                Add New Item
            </button>
        );
    }

    return (
        <div className="card" style={{ marginBottom: 'var(--spacing-lg)', background: 'var(--color-surface-alt)' }}>
            <h3 style={{ marginBottom: '12px' }}>Add New Item</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                    placeholder="Item Name (e.g. Masala Dosa)"
                    className="input"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    placeholder="Kannada Name (Optional)"
                    className="input"
                    value={formData.kannadaName}
                    onChange={e => setFormData({ ...formData, kannadaName: e.target.value })}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="number"
                    placeholder="Price (₹)"
                    className="input"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <textarea
                    placeholder="Description"
                    className="input"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button type="button" onClick={() => setIsOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                        Save Item
                    </button>
                </div>
            </form>
        </div>
    );
}
