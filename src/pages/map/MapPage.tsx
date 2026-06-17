import { useState, useRef, useEffect } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { LeafletMap, type LeafletMapHandle } from '@/components/map/LeafletMap';
import { MapFilter } from '@/components/map/MapFilter';
import { useMapPins } from '@/hooks/useMapPins';
import type { MapMode } from '@/types/map';
import { LogDrinkButton } from '@/components/map/LogdrinkButton';
import { LocationButton } from '@/components/map/Locationbutton';
import { useNavigate } from 'react-router-dom';

const DEFAULT_BBOX = { minLat: 50.77, minLon: 4.25, maxLat: 50.93, maxLon: 4.45 };

export const MapPage = () => {
    const [mode, setMode] = useState<MapMode>('MINE');
    const [bbox, setBbox] = useState(DEFAULT_BBOX);
    const mapRef = useRef<LeafletMapHandle>(null);
    const navigate = useNavigate();

    const { data: pins = [], isLoading, error, refetch } = useMapPins({ mode, ...bbox });

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.centerOnLocation();
        }
    }, []);

    return (
        <div className="fixed inset-0 z-0">
            <LeafletMap
                ref={mapRef}
                pins={pins}
                className="w-full h-full"
                onBoundsChange={(newBbox) => setBbox(newBbox)}
            />

            {/* Top-left state info indicators */}
            <div className="absolute top-4 left-4 z-500 pointer-events-none flex flex-col gap-2">
                {isLoading && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-(--color-surface)/90 text-(--color-text) backdrop-blur-md text-xs font-medium shadow-md border border-(--color-border)">
                        <RefreshCw size={12} className="animate-spin text-(--color-primary)" />
                        <span>Updating map data...</span>
                    </div>
                )}
                {error && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-500 backdrop-blur-md text-xs font-medium shadow-md border border-red-500/20">
                        <AlertCircle size={12} />
                        <span>Failed to fetch pins</span>
                        <button
                            onClick={() => refetch()}
                            className="pointer-events-auto ml-1 underline hover:text-red-600"
                        >
                            Retry
                        </button>
                    </div>
                )}
            </div>

            {/* Centered Map Filter Navigation Menu */}
            <div className="absolute top-[calc(1rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-500 pointer-events-auto">
                <MapFilter mode={mode} onChange={setMode} />
            </div>

            {/* Bottom Primary Actions */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-500 pointer-events-auto">
                <LogDrinkButton onLog={() => navigate('/log')} onSnap={() => navigate('/snap')} />
            </div>

            <div className="absolute bottom-24 right-4 z-500 pointer-events-auto">
                <LocationButton onClick={() => mapRef.current?.centerOnLocation()} />
            </div>
        </div>
    );
};