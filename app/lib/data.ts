export type MenuItem = {
    id: string;
    name: string;
    kannadaName?: string;
    price: number;
    image: string;
    available: boolean;
    description: string;
};

export type Hotel = {
    id: string;
    name: string;
    location: string;
    menu: MenuItem[];
};

export const MOCK_HOTELS: Hotel[] = [
    {
        id: 'h1',
        name: 'Ganesh Darshini',
        location: 'Near Bus Stand, Maddur',
        menu: [
            {
                id: 'm1',
                name: 'Idli Vada Breakfast',
                kannadaName: 'ಇಡ್ಲಿ ವಡೆ',
                price: 40,
                image: '/images/idli_vada_breakfast_1770869384882.png',
                available: true,
                description: 'Soft rice cakes with crispy vada, served with coconut chutney and sambar.'
            },
            {
                id: 'm2',
                name: 'Ragi Mudde Meal',
                kannadaName: 'ರಾಗಿ ಮುದ್ದೆ ಊಟ',
                price: 60,
                image: '/images/ragi_mudde_meal_1770869400937.png',
                available: true,
                description: 'Nutritious millet balls served with hot Soppina Saaru (spinach curry).'
            },
            {
                id: 'm3',
                name: 'Masala Dosa',
                kannadaName: 'ಮಸಾಲೆ ದೋಸೆ',
                price: 50,
                image: '/images/masala_dosa_crispy_1770869417403.png',
                available: true,
                description: 'Crispy golden crepe filled with potato masala, served with chutney.'
            },
            {
                id: 'm4',
                name: 'Filter Coffee',
                kannadaName: 'ಫಿಲ್ಟರ್ ಕಾಫಿ',
                price: 15,
                image: '/images/filter_coffee_steel_1770869433449.png',
                available: true,
                description: 'Strong, aromatic South Indian coffee served in a traditional dabara.'
            }
        ]
    }
];
