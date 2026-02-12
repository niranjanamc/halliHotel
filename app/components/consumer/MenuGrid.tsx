"use client";

import { MenuItem } from '@/app/lib/data';
import MenuItemCard from './MenuItemCard';

export default function MenuGrid({ category, items }: { category: string, items: MenuItem[] }) {
    return (
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2 style={{
                marginBottom: 'var(--spacing-md)',
                color: 'var(--color-primary-dark)',
                borderBottom: '2px solid var(--color-primary)',
                display: 'inline-block',
                paddingBottom: '4px'
            }}>
                {category}
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--spacing-md)'
            }}>
                {items.map(item => (
                    <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}
