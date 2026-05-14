import { useState } from 'react';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { DrinkCatalogItemResponse, DrinkCategory, drinkCategoryConfig, LogDrinkRequest } from '@/types';
import { Button, Rating } from '@/components/ui';
import { VOLUME_PRESETS, DEFAULT_VOLUMES, getSubtypeSuggestions } from '@/config/drinkConfig';
import { DrinkMoreDetails } from './DrinkMoreDetails';
import { DrinkPhotoUpload } from './DrinkPhotoUpload';
import { imageService } from '@/services/imageService';

interface DrinkDetailsFormProps {
    catalogItem: DrinkCatalogItemResponse | null;
    customName?: string;
    draftPhotoUrl?: string | null;
    onBack: () => void;
    onSubmit: (payload: LogDrinkRequest) => void;
    isSubmitting: boolean;
}

export const DrinkDetailsForm = ({
                                     catalogItem,
                                     customName = '',
                                     draftPhotoUrl = null,
                                     onBack,
                                     onSubmit,
                                     isSubmitting,
                                 }: DrinkDetailsFormProps) => {
    const isCatalog = !!catalogItem;
    const lockedCategory = isCatalog ? (catalogItem!.category as DrinkCategory) : null;
    const [category, setCategory] = useState<DrinkCategory>(lockedCategory ?? 'BEER');
    const [drinkName, setDrinkName] = useState(customName);
    const [subType, setSubType] = useState(catalogItem?.subType ?? '');
    const [abv, setAbv] = useState(catalogItem?.abvPercent?.toString() ?? '');
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState('');
    const [photoUrl, setPhotoUrl] = useState<string | null>(draftPhotoUrl ?? null);
    const [isUploading, setIsUploading] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const activeCategory = lockedCategory ?? category;
    const [volume, setVolume] = useState(() => DEFAULT_VOLUMES[activeCategory]);
    const subtypeSuggestions = getSubtypeSuggestions(activeCategory);
    const selectedVolumeLabel = VOLUME_PRESETS[activeCategory].find(p => p.ml === volume)?.label ?? `${volume}ml`;

    const handleCategoryChange = (cat: DrinkCategory) => {
        setCategory(cat);
        setSubType('');
        setVolume(DEFAULT_VOLUMES[cat]);
    };

    const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const uploadedUrl = await imageService.uploadDrinkLogImage(file);
            setPhotoUrl(uploadedUrl);
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = () => {
        const payload: LogDrinkRequest = {
            ...(isCatalog
                    ? { catalogItemId: catalogItem!.id }
                    : { customDrinkName: drinkName || undefined, category: activeCategory, subType: subType || undefined }
            ),
            abvPercent: abv ? parseFloat(abv) : undefined,
            quantity,
            volumeMl: volume,
            rating: rating > 0 ? rating : undefined,
            description: notes || undefined,
            consumedAt: new Date().toISOString(),
            photoUrl: photoUrl || undefined,
        };
        onSubmit(payload);
    };

    return (
        <div className="min-h-screen bg-(--color-background) flex flex-col">
            {/* ── Header ── */}
            <div className="px-4 pt-6 pb-2 flex items-center gap-3">
                <button onClick={onBack} className="p-2 rounded-xl hover:bg-(--color-surface-muted) transition-colors">
                    <ChevronLeft size={20} className="text-(--color-text)" />
                </button>
                <h1 className="text-xl font-bold text-(--color-text)">Log a drink</h1>
            </div>

            <div className="flex-1 px-4 flex flex-col gap-6 pb-12">
                {/* ── Drink Summary Card ── */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-(--color-text)">Drink</label>
                        {isCatalog && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-(--color-ring-soft) text-(--color-primary) border border-(--color-primary)/20">
                                <Sparkles size={11} />
                                From catalog
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between px-4 py-3.5 bg-(--color-surface) border border-(--color-border) rounded-2xl shadow-sm">
                        <div className="flex flex-col">
                            <span className="text-base font-semibold text-(--color-text)">
                                {isCatalog ? catalogItem!.name : (drinkName || 'Custom drink')}
                            </span>
                            {isCatalog && catalogItem!.subType && (
                                <span className="text-xs text-(--color-muted)">{catalogItem!.subType}</span>
                            )}
                        </div>
                        <button onClick={onBack} className="text-sm text-(--color-muted) hover:text-(--color-text) transition-colors">
                            Change
                        </button>
                    </div>
                </div>

                {!isCatalog && (
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={drinkName}
                            onChange={e => setDrinkName(e.target.value)}
                            placeholder="Drink name..."
                            className="px-4 h-12 text-base bg-(--color-surface) border border-(--color-border) rounded-xl focus:ring-2 focus:ring-(--color-primary) outline-none"
                        />
                        <div className="flex flex-wrap gap-2">
                            {(Object.keys(drinkCategoryConfig) as DrinkCategory[]).map(catKey => (
                                <button
                                    key={catKey}
                                    onClick={() => handleCategoryChange(catKey)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                                        category === catKey ? 'bg-(--color-primary) text-white border-(--color-primary)' : 'bg-surface text-text border-border'
                                    }`}
                                >
                                    {drinkCategoryConfig[catKey].label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Rating</label>
                    <Rating value={rating} max={10} size="lg" interactive onChange={setRating} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Volume</label>
                    <div className="flex flex-wrap gap-2">
                        {VOLUME_PRESETS[activeCategory].map(preset => (
                            <button
                                key={preset.ml}
                                onClick={() => setVolume(preset.ml)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                                    volume === preset.ml ? 'bg-(--color-primary) text-white border-(--color-primary)' : 'bg-surface border-border'
                                }`}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Photo Upload Component ── */}
                <DrinkPhotoUpload
                    photoUrl={photoUrl}
                    isUploading={isUploading}
                    onFileSelected={handleFileSelected}
                    onRemove={() => setPhotoUrl(null)}
                />

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">Notes</label>
                    <textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Tasting notes..."
                        rows={3}
                        className="px-4 py-3 bg-(--color-surface) border border-(--color-border) rounded-2xl resize-none focus:ring-2 focus:ring-(--color-primary) outline-none"
                    />
                </div>

                <DrinkMoreDetails
                    isOpen={moreOpen}
                    onToggle={() => setMoreOpen(o => !o)}
                    activeCategory={activeCategory}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    volumeLabel={selectedVolumeLabel}
                    abv={abv}
                    setAbv={setAbv}
                    subType={subType}
                    setSubType={setSubType}
                    subtypeSuggestions={subtypeSuggestions}
                />

                <div className="mt-2">
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full rounded-2xl h-14 font-bold text-lg"
                        isLoading={isSubmitting}
                        onClick={handleSubmit}
                    >
                        Log drink
                    </Button>
                </div>
            </div>
        </div>
    );
};