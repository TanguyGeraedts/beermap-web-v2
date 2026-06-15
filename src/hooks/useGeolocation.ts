import { useCallback } from 'react';

export const useGeolocation = () => {
    const getCurrentLocation = useCallback((): Promise<{ latitude: number | null; longitude: number | null }> => {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                return resolve({ latitude: null, longitude: null });
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.warn("Geolocation fetching failed or denied:", error);
                    resolve({ latitude: null, longitude: null });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        });
    }, []);

    return { getCurrentLocation };
};