import { ChevronDown, ChevronUp } from 'lucide-react';
import { DrinkCategory, drinkCategoryConfig } from '@/types';

interface DrinkMoreDetailsProps {
    isOpen: boolean;
    onToggle: () => void;
    activeCategory: DrinkCategory;
    quantity: number;
    setQuantity: (q: number | ((prev: number) => number)) => void;
    volumeLabel: string;
    abv: string;
    setAbv: (v: string) => void;
    subType: string;
    setSubType: (v: string) => void;
    subtypeSuggestions: string[];
}

export const DrinkMoreDetails = ({
                                     isOpen,
                                     onToggle,
                                     activeCategory,
                                     quantity,
                                     setQuantity,
                                     volumeLabel,
                                     abv,
                                     setAbv,
                                     subType,
                                     setSubType,
                                     subtypeSuggestions,
                                 }: DrinkMoreDetailsProps) => {
    const summary = [
        drinkCategoryConfig[activeCategory].label.toLowerCase(),
        `${quantity}×${volumeLabel}`,
        'Current location',
    ].join(' · ');

    return (
        <div className="border border-dashed border-(--color-border) rounded-2xl overflow-hidden bg-(--color-surface-muted)/30">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3.5"
            >
                <span className="text-sm font-medium text-(--color-text)">More details</span>
                <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs text-(--color-muted) truncate">{summary}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </button>

            {isOpen && (
                <div className="px-4 pb-5 flex flex-col gap-5 border-t border-(--color-border) pt-4">
                    {/* Quantity */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-(--color-muted) uppercase">Quantity</label>
                        <div className="flex items-center gap-4 h-12 w-36 bg-(--color-surface) border border-(--color-border) rounded-xl px-4 shadow-sm">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="text-xl text-(--color-muted) hover:text-(--color-text)"
                            >−</button>
                            <span className="flex-1 text-center font-bold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="text-xl text-(--color-muted) hover:text-(--color-text)"
                            >+</button>
                        </div>
                    </div>

                    {/* ABV */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-(--color-muted) uppercase">ABV %</label>
                        <input
                            type="number"
                            step="0.1"
                            value={abv}
                            onChange={e => setAbv(e.target.value)}
                            placeholder="0.0"
                            className="px-4 h-12 w-32 bg-(--color-surface) border border-(--color-border) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                        />
                    </div>

                    {/* Sub-type */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-(--color-muted) uppercase">Sub-type</label>
                        <input
                            type="text"
                            value={subType}
                            onChange={e => setSubType(e.target.value)}
                            placeholder="e.g. Lager"
                            className="px-4 h-12 bg-(--color-surface) border border-(--color-border) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                        />
                        {subtypeSuggestions.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-1">
                                {subtypeSuggestions.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSubType(s)}
                                        className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                                            subType === s
                                                ? 'bg-(--color-primary) text-(--color-primary-contrast) border-(--color-primary)'
                                                : 'bg-(--color-surface) text-(--color-text) border-(--color-border)'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};