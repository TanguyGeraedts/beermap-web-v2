import { Card } from "@/components/ui";

interface MetricsRowProps {
    summary: {
        totalDrinks: number;
        averageRating: number;
        totalVolume: number;
    };
}

export const MetricsRow = ({ summary }: MetricsRowProps) => {
    const outOfFiveValue = summary.averageRating > 0 ? summary.averageRating / 2 : 0;

    const isLitres = summary.totalVolume >= 1000;
    const volumeValue = isLitres ? (summary.totalVolume / 1000).toFixed(2) : summary.totalVolume;
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
                        {summary.totalDrinks}
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
                        {volumeValue}
                        <span className="text-xs font-medium text-(--color-muted)">{volumeUnit}</span>
                    </span>
                </div>
            </Card>

        </div>
    );
};