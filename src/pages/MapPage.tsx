import { useEffect, useMemo, useState } from 'react';
import L, { type DivIcon, type LatLngExpression, type Map as LeafletMap } from 'leaflet';
import { Camera, Crosshair, Globe, Lock, NotebookPen, Plus, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap
} from 'react-leaflet';
import { Button } from '@/components/ui';
import { useMapPreferences } from '@/hooks/useMapPreferences';
import type { MapPinVisibility, MapStyle } from '@/types';
import { cn } from '@/utils/cn';

type MapPin = {
  id: string;
  title: string;
  subtitle: string;
  position: LatLngExpression;
  visibility: MapPinVisibility;
};

type VisibilityToggleOption = {
  label: string;
  value: MapPinVisibility;
  icon: typeof Globe;
};

const defaultCenter: LatLngExpression = [50.8503, 4.3517];
const defaultZoom = 12;
const userLocationZoom = 14;

const visibilityOptions: VisibilityToggleOption[] = [
  { label: 'Public', value: 'PUBLIC', icon: Globe },
  { label: 'Friends', value: 'FRIENDS', icon: Users },
  { label: 'Private', value: 'PRIVATE', icon: Lock }
];

const demoPins: MapPin[] = [
  {
    id: 'pin-1',
    title: 'Delirium Café',
    subtitle: 'Public tasting',
    position: [50.8484, 4.3549],
    visibility: 'PUBLIC'
  },
  {
    id: 'pin-2',
    title: 'La Porte Noire',
    subtitle: 'Friends-only pour',
    position: [50.8469, 4.3525],
    visibility: 'FRIENDS'
  },
  {
    id: 'pin-3',
    title: 'Home cellar',
    subtitle: 'Private note',
    position: [50.857, 4.3389],
    visibility: 'PRIVATE'
  },
  {
    id: 'pin-4',
    title: 'Moeder Lambic',
    subtitle: 'Public geuze stop',
    position: [50.8385, 4.3474],
    visibility: 'PUBLIC'
  },
  {
    id: 'pin-5',
    title: 'BBP Dansaert',
    subtitle: 'Friends meetup',
    position: [50.8509, 4.3453],
    visibility: 'FRIENDS'
  }
];

const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const tileLayerByStyle: Record<MapStyle, { url: string; attribution: string }> = {
  normal: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: tileAttribution
  },
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
    attribution: tileAttribution
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
    attribution: tileAttribution
  }
};

const visibilityClassByType: Record<MapPinVisibility, string> = {
  PUBLIC: 'public',
  FRIENDS: 'friends',
  PRIVATE: 'private'
};

const createPinIcon = (visibility: MapPinVisibility): DivIcon => {
  const visibilityClass = visibilityClassByType[visibility];

  return L.divIcon({
    className: 'beermap-leaflet-pin-shell',
    html: `<span class="beermap-leaflet-pin beermap-leaflet-pin--${visibilityClass}"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });
};

const pinIconByVisibility: Record<MapPinVisibility, DivIcon> = {
  PUBLIC: createPinIcon('PUBLIC'),
  FRIENDS: createPinIcon('FRIENDS'),
  PRIVATE: createPinIcon('PRIVATE')
};

const MapBridge = ({ onReady }: { onReady: (map: LeafletMap) => void }) => {
  const map = useMap();

  useEffect(() => {
    onReady(map);
  }, [map, onReady]);

  return null;
};

export const MapPage = () => {
  const { pathname } = useLocation();
  const isMapPage = pathname === '/map';
  const { mapStyle } = useMapPreferences();
  const [activeVisibility, setActiveVisibility] =
    useState<MapPinVisibility>('PUBLIC');
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<LatLngExpression | null>(null);
  const [didAutoCenterOnCurrentLocation, setDidAutoCenterOnCurrentLocation] =
    useState(false);
  const [isLogMenuOpen, setIsLogMenuOpen] = useState(false);

  const tileLayer = tileLayerByStyle[mapStyle];
  const filteredPins = useMemo(
    () => demoPins.filter((pin) => pin.visibility === activeVisibility),
    [activeVisibility]
  );

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      return;
    }

    let isActive = true;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (!isActive) {
          return;
        }

        setCurrentLocation([coords.latitude, coords.longitude]);
      },
      () => {},
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 120000
      }
    );

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!isMapPage || !mapInstance) {
      return;
    }

    mapInstance.invalidateSize();
  }, [isMapPage, mapInstance]);

  useEffect(() => {
    if (
      !isMapPage ||
      !mapInstance ||
      !currentLocation ||
      didAutoCenterOnCurrentLocation
    ) {
      return;
    }

    mapInstance.flyTo(currentLocation, userLocationZoom, {
      duration: 0.75
    });
    setDidAutoCenterOnCurrentLocation(true);
  }, [
    currentLocation,
    didAutoCenterOnCurrentLocation,
    isMapPage,
    mapInstance
  ]);

  useEffect(() => {
    if (!isMapPage) {
      setIsLogMenuOpen(false);
    }
  }, [isMapPage]);

  const centerMap = () => {
    if (!mapInstance) {
      return;
    }

    mapInstance.flyTo(
      currentLocation ?? defaultCenter,
      currentLocation ? userLocationZoom : defaultZoom,
      {
        duration: 0.75
      }
    );
  };

  return (
    <div
      aria-hidden={!isMapPage}
      className={cn(
        'fixed inset-0 z-0 overflow-hidden transition-opacity duration-200',
        isMapPage ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <MapContainer
        center={defaultCenter}
        className="absolute inset-0 h-full w-full"
        preferCanvas
        zoom={defaultZoom}
        zoomControl={false}
      >
        <TileLayer attribution={tileLayer.attribution} url={tileLayer.url} />
        <MapBridge onReady={setMapInstance} />

        {filteredPins.map((pin) => (
          <Marker
            icon={pinIconByVisibility[pin.visibility]}
            key={pin.id}
            position={pin.position}
          >
            <Popup closeButton={false} offset={[0, -4]}>
              <div className="grid gap-1">
                <p className="text-sm font-semibold">{pin.title}</p>
                <p className="text-xs text-slate-500">{pin.subtitle}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute inset-0 z-[1100]">
        <div className="pointer-events-auto px-4 pb-6 pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:px-6">
          <div className="mx-auto w-full max-w-lg rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_90%,transparent)] p-1 shadow-[var(--shadow-nav)] backdrop-blur-xl">
            <div className="grid grid-cols-3 gap-1">
              {visibilityOptions.map((option) => {
                const Icon = option.icon;
                const isActive = activeVisibility === option.value;

                return (
                  <button
                    className={cn(
                      'flex min-h-10 items-center justify-center gap-2 rounded-full px-2 text-xs font-semibold transition',
                      isActive
                        ? 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)]'
                        : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]'
                    )}
                    key={option.value}
                    onClick={() => setActiveVisibility(option.value)}
                    type="button"
                  >
                    <Icon className="size-3.5" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pointer-events-auto absolute bottom-32 right-4 sm:right-6">
          <Button
            className="size-11 rounded-full p-0 shadow-[var(--shadow-nav)]"
            onClick={centerMap}
            variant="secondary"
          >
            <Crosshair className="size-5" />
            <span className="sr-only">Center map</span>
          </Button>
        </div>

        <div className="pointer-events-auto absolute bottom-28 left-1/2 grid -translate-x-1/2 justify-items-center gap-2">
          {isLogMenuOpen ? (
            <div className="grid w-[13.5rem] gap-2 rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] p-2 shadow-[var(--shadow-nav)] backdrop-blur-xl">
              <Link
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--color-surface-muted)] px-3 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[color-mix(in_srgb,var(--color-surface-muted)_72%,var(--color-primary))]"
                onClick={() => setIsLogMenuOpen(false)}
                to="/beer/log"
              >
                <NotebookPen className="size-4 text-[var(--color-primary)]" />
                Log beer
              </Link>
              <Link
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--color-surface-muted)] px-3 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[color-mix(in_srgb,var(--color-surface-muted)_72%,var(--color-primary))]"
                onClick={() => setIsLogMenuOpen(false)}
                to="/beer/draft"
              >
                <Camera className="size-4 text-[var(--color-primary)]" />
                Snap beer draft
              </Link>
            </div>
          ) : null}

          <Button
            className="h-11 w-fit rounded-full px-4 shadow-[var(--shadow-nav)]"
            onClick={() => setIsLogMenuOpen((value) => !value)}
            variant="primary"
          >
            <Plus className="size-4" />
            Log a beer
          </Button>
        </div>
      </div>
    </div>
  );
};
