import { useState, useRef, useEffect } from 'react';
import { LocateFixed, MapPin, Search, X } from 'lucide-react';

interface PhotonFeature {
    geometry: { coordinates: [number, number] };
    properties: {
        name?: string;
        street?: string;
        housenumber?: string;
        city?: string;
        country?: string;
        type?: string;
    };
}

function formatFeatureLabel(f: PhotonFeature): string {
    const p = f.properties;
    const parts = [
        p.name,
        p.street && p.housenumber ? `${p.street} ${p.housenumber}` : p.street,
        p.city,
        p.country,
    ].filter(Boolean);
    return parts.join(', ');
}

interface LocationSearchProps {
    latitude: number | undefined;
    setLatitude: (v: number | undefined) => void;
    longitude: number | undefined;
    setLongitude: (v: number | undefined) => void;
}

export const LocationSearch = ({ latitude, setLatitude, longitude, setLongitude }: LocationSearchProps) => {
    const hasLocation = latitude != null && longitude != null;

    const [locationLabel, setLocationLabel] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<PhotonFeature[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setResults([]);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!value.trim()) { setResults([]); return; }
        debounceRef.current = setTimeout(async () => {
            setIsSearching(true);
            try {
                const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5&lang=en`);
                const json = await res.json();
                setResults(json.features ?? []);
            } catch {
                setResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 350);
    };

    const handleSelectResult = (feature: PhotonFeature) => {
        const [lng, lat] = feature.geometry.coordinates;
        setLatitude(lat);
        setLongitude(lng);
        setLocationLabel(formatFeatureLabel(feature));
        setSearchQuery('');
        setResults([]);
        setShowSearch(false);
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            pos => {
                setLatitude(pos.coords.latitude);
                setLongitude(pos.coords.longitude);
                setLocationLabel(null);
                setShowSearch(false);
            },
            err => console.warn('Geolocation failed:', err.message),
            { timeout: 8000, maximumAge: 0 }
        );
    };

    const handleClear = () => {
        setLatitude(undefined);
        setLongitude(undefined);
        setLocationLabel(null);
        setShowSearch(false);
        setSearchQuery('');
        setResults([]);
    };

    const displayLabel = locationLabel ?? (hasLocation ? `${latitude!.toFixed(5)}, ${longitude!.toFixed(5)}` : null);

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-(--color-muted) uppercase">Location</label>

            {/* Set location pill */}
            {hasLocation && !showSearch && (
                <div className="flex items-center gap-3 px-4 h-12 bg-(--color-surface) border border-(--color-border) rounded-xl">
                    <MapPin size={15} className="text-(--color-primary) shrink-0" />
                    <span className="text-sm text-(--color-text) flex-1 truncate">{displayLabel}</span>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={() => setShowSearch(true)}
                            className="text-xs text-(--color-primary) font-medium hover:underline"
                        >
                            Change
                        </button>
                        <span className="text-(--color-border)">·</span>
                        <button
                            onClick={handleClear}
                            className="text-xs text-(--color-muted) hover:text-(--color-text)"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            )}

            {/* No location entry points */}
            {!hasLocation && !showSearch && (
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowSearch(true)}
                        className="flex-1 flex items-center gap-2 px-4 h-12 bg-(--color-surface) border border-(--color-border) rounded-xl text-sm text-(--color-muted) hover:text-(--color-text) transition-colors"
                    >
                        <Search size={15} />
                        Search a place…
                    </button>
                    <button
                        onClick={handleUseCurrentLocation}
                        className="flex items-center gap-2 px-4 h-12 bg-(--color-surface) border border-(--color-border) rounded-xl text-sm text-(--color-muted) hover:text-(--color-text) transition-colors"
                        title="Use current location"
                    >
                        <LocateFixed size={15} />
                    </button>
                </div>
            )}

            {/* Search panel */}
            {showSearch && (
                <div ref={searchRef} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-4 h-12 bg-(--color-surface) border border-(--color-border) rounded-xl focus-within:ring-2 focus-within:ring-(--color-primary)">
                        <Search size={15} className="text-(--color-muted) shrink-0" />
                        <input
                            autoFocus
                            type="text"
                            value={searchQuery}
                            onChange={e => handleSearchChange(e.target.value)}
                            placeholder="Bar name, street, city…"
                            className="flex-1 bg-transparent text-sm outline-none text-(--color-text) placeholder:text-(--color-muted)"
                        />
                        {isSearching && (
                            <span className="text-xs text-(--color-muted) shrink-0">Searching…</span>
                        )}
                        <button onClick={() => { setShowSearch(false); setSearchQuery(''); setResults([]); }}>
                            <X size={15} className="text-(--color-muted) hover:text-(--color-text)" />
                        </button>
                    </div>

                    <button
                        onClick={handleUseCurrentLocation}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-(--color-primary) hover:bg-(--color-surface) transition-colors"
                    >
                        <LocateFixed size={15} />
                        Use my current location
                    </button>

                    {results.length > 0 && (
                        <div className="flex flex-col rounded-xl border border-(--color-border) overflow-hidden bg-(--color-surface) shadow-md">
                            {results.map((feature, i) => {
                                const label = formatFeatureLabel(feature);
                                const type = feature.properties.type;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleSelectResult(feature)}
                                        className="flex items-start gap-3 px-4 py-3 text-left hover:bg-(--color-surface-muted) transition-colors border-b border-(--color-border) last:border-b-0"
                                    >
                                        <MapPin size={14} className="text-(--color-primary) mt-0.5 shrink-0" />
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-medium text-(--color-text) truncate">
                                                {feature.properties.name ?? label}
                                            </span>
                                            {feature.properties.name && (
                                                <span className="text-xs text-(--color-muted) truncate">
                                                    {[feature.properties.street, feature.properties.city, feature.properties.country].filter(Boolean).join(', ')}
                                                </span>
                                            )}
                                            {type && (
                                                <span className="text-xs text-(--color-muted) opacity-60 capitalize">{type}</span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};