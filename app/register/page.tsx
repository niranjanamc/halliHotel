"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/app/context/StoreContext';
import { Store, MapPin } from 'lucide-react';

export default function RegisterHotel() {
    const router = useRouter();
    const { addHotel } = useStore();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.location) return;

        await addHotel({
            name: formData.name,
            location: formData.location,
        });

        router.push('/'); // Redirect to home/list
    };

    return (
        <div className="container" style={{ padding: 'var(--spacing-lg) var(--spacing-md)' }}>
            <header style={{ marginBottom: 'var(--spacing-lg)', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem' }}>HalliHotel Partner</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Register your business</p>
            </header>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Hotel Name</label>
                        <div style={{ position: 'relative' }}>
                            <Store style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-muted)' }} size={20} />
                            <input
                                type="text"
                                placeholder="e.g. Ganesh Darshini"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-surface-alt)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-muted)' }} size={20} />
                            <input
                                type="text"
                                placeholder="e.g. Near Bus Stand, Maddur"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-surface-alt)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--spacing-md)' }}>
                        Register Hotel
                    </button>
                </form>
            </div>
        </div>
    );
}
