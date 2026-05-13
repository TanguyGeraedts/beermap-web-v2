import { useState, useRef } from 'react';
import { Globe, Users, Lock, RefreshCw, AlertCircle } from 'lucide-react';
import { LeafletMap, type LeafletMapHandle } from '@/components/map/LeafletMap';
import { useMapPins } from '@/hooks/useMapPins';
import type { MapPinFilter } from '@/types/map';
import {LogDrinkButton} from "@/components/map/LogdrinkButton.tsx";
import {useNavigate} from "react-router-dom";
import {LocationButton} from "@/components/map/Locationbutton.tsx";

const FILTERS: { id: MapPinFilter; label: string; icon: typeof Globe }[] = [
    { id: 'all',     label: 'All',     icon: Globe  },
    { id: 'friends', label: 'Friends', icon: Users  },
    { id: 'private', label: 'Only me', icon: Lock   },
];

export const MapPage = () => {
    const { data: pins = [], isLoading, error, refetch } = useMapPins();
    const [activeFilter, setActiveFilter] = useState<MapPinFilter>('all');
    const mapRef = useRef<LeafletMapHandle>(null);

    const navigate = useNavigate();
    const visiblePins = pins;

    const handleLogDrink = () => {
        navigate("/log")
    };

    const handleSnapDrink = () => {
        navigate("/snap")
    };

    const handleCenterLocation = () => {
        mapRef.current?.centerOnLocation();
    };

    return (
        <div className="fixed inset-0 z-0">
            <LeafletMap
                ref={mapRef}
                center={[50.8503, 4.3517]}
                zoom={14}
                pins={visiblePins}
                className="absolute inset-0"
            />

            <div className="absolute top-4 left-0 right-0 z-[400] flex flex-col items-center gap-2 pointer-events-none px-4">

                {error && (
                    <div
                        className="flex items-center gap-2 px-4 py-2 rounded-2xl pointer-events-auto"
                        style={{
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            color: '#ef4444',
                        }}
                    >
                        <AlertCircle size={14} />
                        <span className="text-xs">Failed to load pins</span>
                        <button onClick={() => refetch()} className="ml-1 text-xs underline opacity-75">
                            Retry
                        </button>
                    </div>
                )}

                <div
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl pointer-events-auto"
                    style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-nav)',
                    }}
                >
                    {isLoading ? (
                        <RefreshCw size={14} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
                    ) : (
                        <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-primary)' }} />
                    )}
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                        {isLoading ? 'Loading…' : `${visiblePins.length} ${visiblePins.length === 1 ? 'drink' : 'drinks'}`}
                    </span>
                </div>

                <div
                    className="flex gap-1 pointer-events-auto p-1 rounded-2xl"
                    style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-nav)',
                    }}
                >
                    {FILTERS.map(({ id, label, icon: Icon }) => {
                        const isActive = activeFilter === id;
                        return (
                            <button
                                key={id}
                                onClick={() => setActiveFilter(id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                                style={
                                    isActive
                                        ? { background: 'var(--color-primary)', color: 'var(--color-primary-contrast)' }
                                        : { color: 'var(--color-muted)' }
                                }
                            >
                                <Icon size={11} />
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Log Drink Button*/}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-500 pointer-events-auto">
                <LogDrinkButton
                    onLog={handleLogDrink}
                    onSnap={handleSnapDrink}
                />
            </div>

            {/* Location Button */}
            <div className="absolute bottom-24 right-4 z-500 pointer-events-auto">
                <LocationButton onClick={handleCenterLocation} />
            </div>
        </div>
    );
};