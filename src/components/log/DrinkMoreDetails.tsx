import { ChevronDown, ChevronUp } from 'lucide-react';
import { DrinkCategory, drinkCategoryConfig } from '@/types';
import { LocationSearch } from './LocationSearch';
import { LogTimePicker } from './LogTimePicker';
import { QuantityPicker } from './QuantityPicker';
import { SubTypePicker } from './SubTypePicker';
import { NotesPicker } from './NotesPicker';

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
    consumedAt: string;
    setConsumedAt: (v: string) => void;
    latitude: number | undefined;
    setLatitude: (v: number | undefined) => void;
    longitude: number | undefined;
    setLongitude: (v: number | undefined) => void;
    notes: string;
    setNotes: (v: string) => void;
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
                                     consumedAt,
                                     setConsumedAt,
                                     latitude,
                                     setLatitude,
                                     longitude,
                                     setLongitude,
                                     notes,
                                     setNotes,
                                 }: DrinkMoreDetailsProps) => {
    const hasLocation = latitude != null && longitude != null;

    const summary = [
        drinkCategoryConfig[activeCategory].label.toLowerCase(),
        `${quantity}×${volumeLabel}`,
        hasLocation ? 'Location set' : 'No location',
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
                    <LogTimePicker consumedAt={consumedAt} setConsumedAt={setConsumedAt} />
                    <LocationSearch
                        latitude={latitude}
                        setLatitude={setLatitude}
                        longitude={longitude}
                        setLongitude={setLongitude}
                    />
                    <QuantityPicker quantity={quantity} setQuantity={setQuantity} />
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-(--color-muted) uppercase">ABV %</label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={abv}
                            onChange={e => {
                                const normalized = e.target.value.replace(',', '.');
                                if (/^\d*\.?\d*$/.test(normalized)) setAbv(e.target.value);
                            }}
                            onBlur={e => {
                                setAbv(e.target.value.replace(',', '.'));
                            }}
                            placeholder="0.0"
                            className="px-4 h-14 w-36 bg-(--color-surface) border border-(--color-border) rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                        />
                    </div>
                    <SubTypePicker subType={subType} setSubType={setSubType} suggestions={subtypeSuggestions} />
                    <NotesPicker notes={notes} setNotes={setNotes} />
                </div>
            )}
        </div>
    );
};