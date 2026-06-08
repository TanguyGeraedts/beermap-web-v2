import { Info } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useJournalDay } from '@/hooks/useJournalDay';
import { Card } from "@/components/ui";
import { JournalHeader } from '@/components/journal/JournalHeader';
import { MetricsRow } from '@/components/journal/MetricsRow';
import { DrinkLogCard } from '@/components/journal/DrinkLogCard';
import { PageSkeleton } from '@/components/journal/PageSkeleton';

export const JournalDayPage = () => {
    const { date } = useParams<{ date: string }>();
    const { drinks, summary, isLoading } = useJournalDay(date);

    const formattedDate = date
        ? new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
        : 'Unknown Date';

    if (isLoading) {
        return <PageSkeleton />;
    }

    return (
        <div className="space-y-4">
            <JournalHeader date={date} formattedDate={formattedDate} />

            <MetricsRow summary={summary} />

            <div className="space-y-3 pt-2">
                <h2 className="text-sm font-semibold text-(--color-muted) uppercase tracking-wider px-1">
                    Logged Entries
                </h2>

                {drinks.length === 0 ? (
                    <Card variant="default" className="p-8 text-center text-(--color-muted)">
                        <Info size={24} className="mx-auto mb-2 opacity-60" />
                        <p className="text-sm">No drinks logged for this day.</p>
                    </Card>
                ) : (
                    drinks.map((drink) => (
                        <DrinkLogCard key={drink.id} drink={drink} />
                    ))
                )}
            </div>
        </div>
    );
};