import { useState, useEffect } from 'react';
import { drinkLogService } from '@/services/drinkLogService';
import { DrinkLogResponse } from '@/types';

export const useJournalDay = (date: string | undefined) => {
    const [drinks, setDrinks] = useState<DrinkLogResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown | null>(null);

    useEffect(() => {
        if (!date) return;

        const fetchDayData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await drinkLogService.getDrinksFromDay(date);
                setDrinks(data || []);
            } catch (err) {
                console.error("Failed fetching day logs:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDayData();
    }, [date]);

    const summary = {
        totalDrinks: drinks.reduce((acc, current) => acc + (current.quantity || 1), 0),

        averageRating: drinks.filter(d => d.rating !== undefined && d.rating !== null).length > 0
            ? drinks.reduce((acc, current) => acc + (current.rating || 0), 0) /
            drinks.filter(d => d.rating !== undefined && d.rating !== null).length
            : 0,

        totalVolume: drinks.reduce((acc, current) => acc + (current.volumeMl || 0), 0)
    };

    return {
        drinks,
        summary,
        isLoading,
        error
    };
};