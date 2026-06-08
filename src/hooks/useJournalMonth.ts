import { useQuery } from '@tanstack/react-query';
import { drinkLogService } from '@/services/drinkLogService';
import type { DrinkData } from '@/components/ui/components/DrinkCalendar';

/**
 * Fetches all drink logs for a given month and reduces them into a
 * DrinkData map ({ "2026-06-03": 2, "2026-06-07": 5, ... }) suitable
 * for DrinkCalendar.
 *
 * Uses the existing timeline endpoint with a large page size to get all
 * logs in one shot. Once you have a dedicated calendar endpoint on the
 * backend, swap the fetcher below and delete the client-side grouping.
 *
 * @param year       Full year, e.g. 2026
 * @param monthIndex 0-based month index (0 = January), defaults to current month
 */
export function useJournalMonth(year?: number, monthIndex?: number) {
    const now          = new Date();
    const resolvedYear  = year        ?? now.getFullYear();
    const resolvedMonth = monthIndex  ?? now.getMonth();

    return useQuery<DrinkData>({
        queryKey: ['journal-month', resolvedYear, resolvedMonth],
        queryFn: async () => {
            const timeline = await drinkLogService.getTimeline(0, 200);

            const prefix = `${resolvedYear}-${String(resolvedMonth + 1).padStart(2, '0')}-`;

            const counts: DrinkData = {};

            for (const log of timeline.content) {
                const dateStr = log.consumedAt;
                if (!dateStr) continue;

                const iso = dateStr.slice(0, 10);
                if (!iso.startsWith(prefix)) continue;

                counts[iso] = (counts[iso] ?? 0) + (log.quantity ?? 1);
            }

            return counts;
        },
        staleTime: 1000 * 60 * 5, // 5 min — calendar data doesn't need to be live
    });
}