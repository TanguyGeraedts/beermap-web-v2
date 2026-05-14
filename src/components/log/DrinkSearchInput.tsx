import { useState, useRef, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { useDrinkCatalogSearchByName } from '@/hooks/useDrinkCatalog';
import { DrinkCatalogItemResponse, DrinkCategory, drinkCategoryConfig } from '@/types';

interface DrinkSearchInputProps {
    onSelect: (item: DrinkCatalogItemResponse | null) => void;
    onCustom: (name?: string) => void;
    selectedItem: DrinkCatalogItemResponse | null;
}

export const DrinkSearchInput = ({ onSelect, onCustom, selectedItem }: DrinkSearchInputProps) => {
    const [query, setQuery] = useState(selectedItem?.name ?? '');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: results = [], isLoading } = useDrinkCatalogSearchByName(
        query.length > 0 ? query : null
    );

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSelect = (item: DrinkCatalogItemResponse) => {
        onSelect(item);
        setQuery(item.name);
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsOpen(true);
        if (!e.target.value) {
            onSelect(null);
        }
    };

    const showDropdown = isOpen && (results.length > 0 || (query.length > 0 && !isLoading));

    return (
        <div className="flex flex-col gap-1.5" ref={containerRef}>
            <label className="text-sm font-medium text-(--color-text)">Drink</label>

            <div
                className={`
                    flex items-center gap-3 px-4
                    bg-(--color-surface)
                    border-2 rounded-2xl h-14
                    transition-all duration-200
                    ${isOpen
                    ? 'border-(--color-primary) ring-4 ring-(--color-primary)/10'
                    : 'border-(--color-border)'
                }
                `}
            >
                <Search size={18} className="text-(--color-muted) shrink-0" />
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search Stella, Negroni, Yamazaki..."
                    className="
                        flex-1 bg-transparent text-(--color-text)
                        placeholder:text-(--color-muted)
                        text-base focus:outline-none
                    "
                />
            </div>

            {showDropdown && (
                <div className="
                    mt-1 bg-(--color-surface)
                    border border-(--color-border)
                    rounded-2xl overflow-hidden
                    shadow-lg
                ">
                    {results.map((item,) => {
                        const config = drinkCategoryConfig[item.category as DrinkCategory];
                        const Icon = config?.icon;
                        const color = config?.color ?? 'text-slate-600';
                        const label = config?.label ?? item.category;
                        const meta = [
                            item.subType,
                            item.abvPercent != null ? `${item.abvPercent}%` : null,
                        ].filter(Boolean).join(' · ');

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className={`
                                    w-full flex items-center gap-4 px-4 py-3 text-left
                                    hover:bg-(--color-surface-muted) transition-colors duration-100
                                    cursor-pointer
                                    border-b border-(--color-border)
                                `}
                            >
                                <div className={`
                                    flex items-center gap-1.5 px-2.5 py-1.5
                                    bg-(--color-surface-muted) rounded-xl
                                    shrink-0 min-w-[80px] justify-center
                                    border border-(--color-border)
                                `}>
                                    {Icon && <Icon size={14} className={color} />}
                                    <span className={`text-xs font-semibold ${color}`}>{label}</span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-(--color-text) truncate">
                                        {item.name}
                                    </span>
                                    {meta && (
                                        <span className="text-xs text-(--color-muted) truncate">
                                            {meta}
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })}

                    {/* Can't find it row */}
                    <button
                        onClick={() => { setIsOpen(false); onCustom(query || undefined); }}
                        className="
                            w-full flex items-center gap-3 px-4 py-3 text-left
                            hover:bg-(--color-surface-muted) transition-colors duration-100
                            cursor-pointer
                        "
                    >
                        <div className="
                            flex items-center justify-center w-8 h-8
                            bg-(--color-ring-soft) rounded-xl shrink-0
                        ">
                            <Plus size={14} className="text-(--color-primary)" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-(--color-primary)">
                                {query.length > 0 ? `Add "${query}" as custom drink` : "Can't find it? Add custom drink"}
                            </span>
                            <span className="text-xs text-(--color-muted)">Log it manually</span>
                        </div>
                    </button>
                </div>
            )}

            {isOpen && isLoading && query.length > 0 && (
                <div className="
                    mt-1 bg-(--color-surface) border border-(--color-border)
                    rounded-2xl px-4 py-3 text-sm text-(--color-muted)
                ">
                    Searching...
                </div>
            )}
        </div>
    );
};