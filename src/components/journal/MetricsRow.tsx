import { Card } from "@/components/ui";

interface MetricsRowProps {
    summary?: {
        totalDrinks?: number | null;
        averageRating?: number | null;
        totalVolume?: number | null;
    } | null;
}

export const MetricsRow = ({ summary }: MetricsRowProps) => {
    // 1. Fallback values if properties are missing or null
    const totalDrinks = summary?.totalDrinks || 0;
    const averageRating = summary?.averageRating || 0;
    const totalVolume = summary?.totalVolume || 0;

    // 2. Fail-safe math logic
    const outOfFiveValue = averageRating > 0 ? averageRating / 2 : 0;

    const safeVolume = Math.max(0, totalVolume);
    const isLitres = safeVolume >= 1000;
    const volumeValue = isLitres ? (safeVolume / 1000).toFixed(2) : safeVolume;
    const volumeUnit = isLitres ? 'L' : 'ml';

    return (
        <div className="grid grid-cols-3 gap-3">
            {/* Drinks Counter */}
            <Card variant="muted" className="text-center p-2.5 flex flex-col justify-between min-h-19">
                <span className="text-[10px] uppercase tracking-wider text-(--color-muted) font-semibold block">
                    Drinks
                </span>
                <div className="flex flex-col items-center justify-center flex-1 mt-1">
                    <span className="text-2xl font-black text-(--color-text) leading-none block">
                        {totalDrinks}
                    </span>
                </div>
            </Card>

            {/* Average Rating */}
            <Card variant="muted" className="text-center p-2.5 flex flex-col justify-between min-h-19">
                <span className="text-[10px] uppercase tracking-wider text-(--color-muted) font-semibold block">
                    Avg Rating
                </span>
                <div className="flex flex-col items-center justify-center flex-1 mt-1 w-full">
                    <span className="text-2xl font-black text-(--color-text) leading-none block">
                        {outOfFiveValue > 0 ? outOfFiveValue.toFixed(1) : '—'}
                        {outOfFiveValue > 0 && <span className="text-xs font-medium text-(--color-muted)">/5</span>}
                    </span>
                </div>
            </Card>

            {/* Total Volume */}
            <Card variant="muted" className="text-center p-2.5 flex flex-col justify-between min-h-19">
                <span className="text-[10px] uppercase tracking-wider text-(--color-muted) font-semibold block">
                    Volume
                </span>
                <div className="flex flex-col items-center justify-center flex-1 mt-1">
                    <span className="text-2xl font-black text-(--color-text) leading-none block">
                        {/* If volume is 0, just show '0ml' instead of blank space */}
                        {volumeValue}
                        <span className="text-xs font-medium text-(--color-muted)">{volumeUnit}</span>
                    </span>
                </div>
            </Card>
        </div>
    );
};