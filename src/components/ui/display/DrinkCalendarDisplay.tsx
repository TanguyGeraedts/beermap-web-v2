import { useState } from 'react';
import { DrinkCalendar, type DrinkData } from '@/components/ui/components/DrinkCalendar';

function makeData(): DrinkData {
    const now   = new Date();
    const year  = now.getFullYear();
    const month = now.getMonth();

    const entries: [number, number][] = [
        [1, 1], [3, 4], [5, 2], [7, 7], [8, 3],
        [10, 1], [12, 6], [14, 2], [15, 5], [17, 1],
        [19, 3], [20, 8], [21, 2], [22, 1], [24, 4],
        [26, 2], [27, 6], [28, 1],
    ];

    const todayDay = now.getDate();
    if (!entries.find(([d]) => d === todayDay)) {
        entries.push([todayDay, 3]);
    }

    return Object.fromEntries(
        entries
            .filter(([d]) => d <= new Date(year, month + 1, 0).getDate())
            .map(([d, count]) => {
                const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                return [iso, count];
            })
    );
}

export function DrinkCalendarDisplay() {
    const [drinkData] = useState<DrinkData>(makeData);
    const [lastClicked, setLastClicked] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-(--color-app-bg) p-8">
            <div className="max-w-sm mx-auto space-y-8">

                <div>
                    <h1 className="text-2xl font-bold text-(--color-text) mb-1">DrinkCalendar</h1>
                    <p className="text-sm text-(--color-muted)">
                        Monthly heatmap calendar for drink logging.
                    </p>
                </div>

                {/* Default — navigable, clicks navigate to /journal/day/{date} */}
                <section className="space-y-2">
                    <h2 className="text-sm font-semibold text-(--color-text)">Default</h2>
                    <DrinkCalendar drinkData={drinkData} />
                </section>

                {/* With custom onDayClick */}
                <section className="space-y-2">
                    <h2 className="text-sm font-semibold text-(--color-text)">Custom onDayClick</h2>
                    <DrinkCalendar
                        drinkData={drinkData}
                        onDayClick={(date, count) =>
                            setLastClicked(
                                count > 0
                                    ? `${date} — ${count} drink${count !== 1 ? 's' : ''}`
                                    : `${date} — no drinks`
                            )
                        }
                    />
                    {lastClicked && (
                        <p className="text-xs text-(--color-muted)">
                            Clicked: <span className="text-(--color-text) font-medium">{lastClicked}</span>
                        </p>
                    )}
                </section>

                {/* Non-navigable */}
                <section className="space-y-2">
                    <h2 className="text-sm font-semibold text-(--color-text)">Non-navigable</h2>
                    <DrinkCalendar drinkData={drinkData} navigable={false} />
                </section>

            </div>
        </div>
    );
}