import { BookOpen, FilePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DrinkCalendar } from '@/components/ui/components/DrinkCalendar';
import { useJournalMonth } from '@/hooks/useJournalMonth';
import { LastDrinkCard } from '@/components/journal/LastDrinkCard';

export const JournalPage = () => {
    const navigate = useNavigate();
    const { data: drinkData, isLoading } = useJournalMonth();

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <BookOpen size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Journal</h1>
                </div>
                <button
                    onClick={() => navigate('/drafts')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors"
                    style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-muted)',
                    }}
                >
                    <FilePen size={14} />
                    Drafts
                </button>
            </div>

            {/* Last drink */}
            <LastDrinkCard />

            {/* Calendar */}
            {isLoading ? (
                <div
                    className="rounded-xl h-96 animate-pulse"
                    style={{ background: 'var(--color-surface)' }}
                />
            ) : (
                <DrinkCalendar drinkData={drinkData ?? {}} />
            )}
        </div>
    );
};