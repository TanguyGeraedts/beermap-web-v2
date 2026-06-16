import { useState } from 'react';
import { BookOpen, FilePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DrinkCalendar } from '@/components/ui/components/DrinkCalendar';
import { useJournalMonth } from '@/hooks/useJournalMonth';
import { LastDrinkCard } from '@/components/journal/LastDrinkCard';
import { Button } from "@/components/ui";

export const JournalPage = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(() => new Date());
    const { data: drinkData, isLoading } = useJournalMonth(currentMonth);

    const handleDayClick = (dateStr: string) => {
        navigate(`/journal/day/${dateStr}`);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-(--color-primary)" />
                    <h1 className="text-xl font-bold text-(--color-text)">Journal</h1>
                </div>

                <Button
                    variant="secondary"
                    size="sm"
                    className="gap-1.5 rounded-xl px-3! py-1.5! text-sm font-medium text-(--color-muted)"
                    onClick={() => navigate('/drafts')}
                >
                    <FilePen size={14} />
                    Drafts
                </Button>
            </div>

            {/* Last drink overview banner */}
            <LastDrinkCard />

            {/* Monthly Grid Calendar Component View */}
            {isLoading ? (
                <div
                    className="rounded-xl h-96 animate-pulse bg-(--color-surface)"
                />
            ) : (
                <DrinkCalendar
                    drinkData={drinkData ?? {}}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    onDayClick={handleDayClick}
                />
            )}
        </div>
    );
};