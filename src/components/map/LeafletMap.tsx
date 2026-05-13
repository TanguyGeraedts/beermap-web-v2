import { useEffect, useRef, forwardRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { DrinkLogPin } from '@/types/map';
import { createDrinkPin, createClusterPin } from './DrinkPin';

interface ClusteredPin {
    pins: DrinkLogPin[];
    lat: number;
    lng: number;
}

function clusterPins(pins: DrinkLogPin[], zoom: number): ClusteredPin[] {
    const cellSize = Math.max(0.001, 2 / Math.pow(2, zoom - 8));
    const cells = new Map<string, DrinkLogPin[]>();

    for (const pin of pins) {
        const key = `${Math.floor(pin.latitude / cellSize)}:${Math.floor(pin.longitude / cellSize)}`;
        if (!cells.has(key)) cells.set(key, []);
        cells.get(key)!.push(pin);
    }

    return Array.from(cells.values()).map((group) => ({
        pins: group,
        lat: group.reduce((s, p) => s + p.latitude, 0) / group.length,
        lng: group.reduce((s, p) => s + p.longitude, 0) / group.length,
    }));
}

function buildPopup(pins: DrinkLogPin[]): string {
    if (pins.length === 1) {
        const p = pins[0];
        const date = new Date(p.consumedAt).toLocaleDateString(undefined, {
            day: 'numeric', month: 'short', year: 'numeric',
        });
        const stars = p.rating != null
            ? '★'.repeat(Math.round(p.rating / 2)) + '☆'.repeat(Math.max(0, 5 - Math.round(p.rating / 2)))
            : null;
        return `
            <div style="min-width:140px;max-width:200px">
                <strong style="font-size:0.875rem;display:block;margin-bottom:2px">${p.displayName}</strong>
                ${p.subType ? `<span style="font-size:0.75rem;opacity:0.65">${p.subType}</span>` : ''}
                ${stars ? `<div style="color:#f59e0b;font-size:0.75rem;margin-top:3px">${stars}</div>` : ''}
                ${p.description ? `<p style="margin:5px 0 0;font-size:0.75rem;opacity:0.75">${p.description}</p>` : ''}
                <span style="display:block;margin-top:5px;font-size:0.7rem;opacity:0.5">${date}</span>
            </div>
        `;
    }

    const shown = pins.slice(0, 5);
    const rest = pins.length - shown.length;
    const rows = shown.map((p) => `<li style="padding:2px 0;font-size:0.8rem">${p.displayName}</li>`).join('');
    return `
        <div style="min-width:140px">
            <strong style="font-size:0.875rem">${pins.length} drinks here</strong>
            <ul style="margin:6px 0 0;padding-left:16px">${rows}</ul>
            ${rest > 0 ? `<span style="font-size:0.72rem;opacity:0.55">and ${rest} more…</span>` : ''}
        </div>
    `;
}

interface LeafletMapProps {
    center?: [number, number];
    zoom?: number;
    pins?: DrinkLogPin[];
    className?: string;
}

export interface LeafletMapHandle {
    centerOnLocation: () => void;
}

export const LeafletMap = forwardRef<LeafletMapHandle, LeafletMapProps>(
    ({
         center = [50.8503, 4.3517],
         zoom = 13,
         pins = [],
         className = '',
     }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const mapRef = useRef<L.Map | null>(null);
        const markersRef = useRef<L.Marker[]>([]);
        const pinsRef = useRef<DrinkLogPin[]>(pins);

        const renderMarkers = (map: L.Map, allPins: DrinkLogPin[], currentZoom: number) => {
            markersRef.current.forEach((m) => m.remove());
            markersRef.current = [];

            for (const cluster of clusterPins(allPins, currentZoom)) {
                const isSingle = cluster.pins.length === 1;
                const dominant = cluster.pins[0].category;
                const icon = isSingle
                    ? createDrinkPin(dominant)
                    : createClusterPin(cluster.pins.length, dominant);

                const marker = L.marker([cluster.lat, cluster.lng], { icon });
                marker.bindPopup(buildPopup(cluster.pins), { maxWidth: 220 });
                marker.addTo(map);
                markersRef.current.push(marker);
            }
        };

        // Expose centerOnLocation method via ref
        useEffect(() => {
            if (ref && typeof ref === 'object' && 'current' in ref) {
                ref.current = {
                    centerOnLocation: () => {
                        if (navigator.geolocation && mapRef.current) {
                            navigator.geolocation.getCurrentPosition((pos) => {
                                const { latitude, longitude } = pos.coords;
                                mapRef.current?.setView([latitude, longitude], mapRef.current.getZoom());
                            });
                        }
                    },
                };
            }
        }, [ref]);

        // Initialise map once
        useEffect(() => {
            if (!containerRef.current || mapRef.current) return;

            const map = L.map(containerRef.current, { center, zoom, zoomControl: false });

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

            map.on('zoomend', () => {
                renderMarkers(map, pinsRef.current, map.getZoom());
            });

            mapRef.current = map;

            return () => {
                map.remove();
                mapRef.current = null;
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        // Sync pins whenever they change
        useEffect(() => {
            pinsRef.current = pins;
            const map = mapRef.current;
            if (!map) return;
            renderMarkers(map, pins, map.getZoom());
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [pins]);

        return (
            <div
                ref={containerRef}
                id="map-element"
                className={`map-container w-full h-full ${className}`}
            />
        );
    }
);

LeafletMap.displayName = 'LeafletMap';