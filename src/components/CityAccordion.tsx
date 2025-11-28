import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

// --- Data for the image accordion ---
const cities = [
    {
        id: 1,
        title: 'Paris',
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
        description: 'France'
    },
    {
        id: 2,
        title: 'New York',
        imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop',
        description: 'USA'
    },
    {
        id: 3,
        title: 'Tokyo',
        imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop',
        description: 'Japon'
    },
    {
        id: 4,
        title: 'Londres',
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop',
        description: 'Royaume-Uni'
    },
    {
        id: 5,
        title: 'Berlin',
        imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=2070&auto=format&fit=crop',
        description: 'Allemagne'
    },
];

interface AccordionItemProps {
    item: typeof cities[0];
    isActive: boolean;
    onMouseEnter: () => void;
    onClick: () => void;
}

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter, onClick }: AccordionItemProps) => {
    return (
        <div
            className={cn(
                "relative h-[450px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                isActive ? "w-[300px] md:w-[400px] flex-grow" : "w-[60px] md:w-[80px] flex-shrink-0"
            )}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
        >
            {/* Background Image */}
            <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />

            {/* Overlay */}
            <div className={cn(
                "absolute inset-0 transition-opacity duration-300",
                isActive ? "bg-black/20" : "bg-black/40 hover:bg-black/30"
            )} />

            {/* Content */}
            <div className={cn(
                "absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300",
                isActive ? "opacity-100" : "opacity-0"
            )}>
                <div className="transform translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-1">
                        <MapPin className="w-4 h-4" />
                        {item.description}
                    </div>
                    <h3 className="text-white text-3xl font-bold tracking-tight">
                        {item.title}
                    </h3>
                </div>
            </div>

            {/* Vertical Text for Inactive State */}
            <div className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                isActive ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
                <span className="text-white font-bold text-lg tracking-widest uppercase rotate-90 whitespace-nowrap">
                    {item.title}
                </span>
            </div>
        </div>
    );
};

// --- Main Component ---
export default function CityAccordion() {
    const [activeIndex, setActiveIndex] = useState(2);
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate('/marketplace');
    };

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Side: Text Content */}
                    <div className="w-full lg:w-1/3 text-center lg:text-left space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Une présence <span className="text-blue-600">internationale</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Que vous soyez à Paris, New York ou Tokyo, trouvez le mentor idéal qui comprend votre contexte local et vos ambitions globales.
                        </p>
                        <button
                            onClick={handleItemClick}
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1"
                        >
                            Explorer la marketplace
                        </button>
                    </div>

                    {/* Right Side: Image Accordion */}
                    <div className="w-full lg:w-2/3">
                        <div className="flex flex-row items-center justify-center gap-3 h-[450px]">
                            {cities.map((item, index) => (
                                <AccordionItem
                                    key={item.id}
                                    item={item}
                                    isActive={index === activeIndex}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={handleItemClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
