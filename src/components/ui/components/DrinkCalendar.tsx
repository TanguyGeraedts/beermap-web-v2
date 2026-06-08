import { forwardRef, type HTMLAttributes, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beer } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

/** A map of ISO date strings (YYYY-MM-DD) to drink counts for that day. */
export type DrinkData = Record<string, number>;

type DrinkIntensity = 'none' | 'light' | 'moderate' | 'heavy';

interface DrinkCalendarProps extends HTMLAttributes<HTMLDivElement> {
    /** Map of ISO date strings to drink counts, e.g. { "2025-06-03": 2 } */
    drinkData: DrinkData;
    /**
     * Month to display. Defaults to current month.
     * Pass a Date object set to any day within the desired month.
     */
    month?: Date;
    /**
     * Called when user clicks a day cell. Receives the ISO date string.
     * If omitted, clicks navigate to /journal/day/{date} via react-router.
     */
    onDayClick?: (date: string, count: number) => void;
    /** Allow navigating between months. Defaults to true. */
    navigable?: boolean;
}

// ─── Thresholds ───────────────────────────────────────────────────────────────

const THRESHOLDS: { max: number; intensity: DrinkIntensity }[] = [
    { max: 0,        intensity: 'none'     },
    { max: 2,        intensity: 'light'    },
    { max: 5,        intensity: 'moderate' },
    { max: Infinity, intensity: 'heavy'    },
];

function getIntensity(count: number): DrinkIntensity {
    for (const { max, intensity } of THRESHOLDS) {
        if (count <= max) return intensity;
    }
    return 'heavy';
}

const intensityStyles: Record<DrinkIntensity, string> = {
    none:     'bg-transparent',
    light:    'bg-[var(--color-drink-light)]',
    moderate: 'bg-[var(--color-drink-moderate)]',
    heavy:    'bg-[var(--color-drink-heavy)]',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function toIso(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth()    === b.getMonth()    &&
        a.getDate()     === b.getDate()
    );
}

/**
 * Returns an array of "cells" for the calendar grid.
 * Cells before the 1st and after the last are null (empty padding).
 * Week starts on Monday.
 */
function buildCalendarGrid(year: number, month: number): (number | null)[] {
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    // Convert Sunday-based (0–6) to Monday-based (0–6)
    const offset = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    // Pad to complete the final week row
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

/** Count how many days in drinkData fall within the given year+month. */
function computeMonthStats(
    drinkData: DrinkData,
    year: number,
    monthIndex: number
): { daysDrank: number; totalDrinks: number } {
    const prefix = `${year}-${String(monthIndex + 1).padStart(2, '0')}-`;
    let daysDrank = 0;
    let totalDrinks = 0;
    for (const [iso, count] of Object.entries(drinkData)) {
        if (iso.startsWith(prefix) && count > 0) {
            daysDrank++;
            totalDrinks += count;
        }
    }
    return { daysDrank, totalDrinks };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface DayCellProps {
    day: number;
    iso: string;
    count: number;
    isToday: boolean;
    onClick: (iso: string, count: number) => void;
}

const DayCell = ({ day, iso, count, isToday, onClick }: DayCellProps) => {
    const intensity = getIntensity(count);

    return (
        <button
            type="button"
            title={count > 0 ? `${iso}: ${count} drink${count !== 1 ? 's' : ''}` : iso}
            onClick={() => onClick(iso, count)}
            className={`
                relative flex flex-col items-center justify-center
                w-full aspect-square min-h-20 rounded-lg
                text-sm font-medium
                transition-all duration-150
                cursor-pointer
                select-none
                ${intensityStyles[intensity]}
                ${count === 0
                ? 'text-[var(--color-muted)] hover:bg-[var(--color-surface-muted)]'
                : 'text-[var(--color-drink-text)] hover:brightness-110'
            }
                ${isToday
                ? 'ring-2 ring-[var(--color-primary)] ring-offset-1 ring-offset-[var(--color-surface)] font-bold'
                : ''
            }
            `}
        >
            <span className="text-base">{day}</span>
            {count > 0 && (
                <span className="flex items-center gap-0.5 mt-1 opacity-75 leading-none">
                    <Beer style={{ width: '10px', height: '10px' }} strokeWidth={2.5} />
                    <span className="text-[10px] font-semibold">{count}</span>
                </span>
            )}
        </button>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * DrinkCalendar — a monthly heatmap calendar for drink logging.
 *
 * Cells are colour-coded by drink count using CSS variables:
 *   --color-drink-light      (1–2 drinks)
 *   --color-drink-moderate   (3–5 drinks)
 *   --color-drink-heavy      (6+ drinks)
 *   --color-drink-text       (text on coloured cells)
 *
 * Today's cell is ringed with --color-primary.
 * Clicking a day navigates to /journal/day/{date} (or calls onDayClick if provided).
 *
 * @example
 * const data = {
 *   "2025-06-03": 2,
 *   "2025-06-07": 5,
 *   "2025-06-14": 8,
 * };
 *
 * <DrinkCalendar drinkData={data} />
 */
export const DrinkCalendar = forwardRef<HTMLDivElement, DrinkCalendarProps>(
    (
        {
            drinkData,
            month,
            onDayClick,
            navigable = true,
            className = '',
            ...props
        },
        ref
    ) => {
        const navigate = useNavigate();
        const today = useMemo(() => new Date(), []);

        const [viewDate, setViewDate] = useState(() => month ?? new Date());
        const year       = viewDate.getFullYear();
        const monthIndex = viewDate.getMonth();

        const cells = useMemo(() => buildCalendarGrid(year, monthIndex), [year, monthIndex]);

        const { daysDrank, totalDrinks } = useMemo(
            () => computeMonthStats(drinkData, year, monthIndex),
            [drinkData, year, monthIndex]
        );

        const monthName = viewDate.toLocaleString('default', { month: 'long' });

        function prevMonth() {
            setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
        }
        function nextMonth() {
            setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
        }

        function handleDayClick(iso: string, count: number) {
            if (onDayClick) {
                onDayClick(iso, count);
            } else {
                navigate(`/journal/day/${iso}`);
            }
        }

        return (
            <div
                ref={ref}
                className={`
                    bg-[var(--color-surface)]
                    border border-[var(--color-border)]
                    rounded-xl p-4
                    ${className}
                `}
                {...props}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                    {navigable ? (
                        <button
                            type="button"
                            onClick={prevMonth}
                            aria-label="Previous month"
                            className="
                                w-8 h-8 flex items-center justify-center
                                rounded-md text-[var(--color-muted)]
                                hover:bg-[var(--color-surface-muted)]
                                hover:text-[var(--color-text)]
                                transition-colors duration-150
                                cursor-pointer
                            "
                        >
                            ‹
                        </button>
                    ) : <div className="w-8" />}

                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-base font-bold text-[var(--color-text)] leading-tight">
                            {monthName}
                        </span>
                        <span className="text-[11px] text-[var(--color-muted)] leading-tight">
                            {year}
                            {daysDrank > 0 && (
                                <>
                                    <span className="mx-1.5 opacity-40">•</span>
                                    {daysDrank} day{daysDrank !== 1 ? 's' : ''}
                                    <span className="mx-1.5 opacity-40">•</span>
                                    {totalDrinks} drink{totalDrinks !== 1 ? 's' : ''}
                                </>
                            )}
                        </span>
                    </div>

                    {navigable ? (
                        <button
                            type="button"
                            onClick={nextMonth}
                            aria-label="Next month"
                            className="
                                w-8 h-8 flex items-center justify-center
                                rounded-md text-[var(--color-muted)]
                                hover:bg-[var(--color-surface-muted)]
                                hover:text-[var(--color-text)]
                                transition-colors duration-150
                                cursor-pointer
                            "
                        >
                            ›
                        </button>
                    ) : <div className="w-8" />}
                </div>

                {/* Day-of-week headers */}
                <div className="grid grid-cols-7 gap-1 mb-1 mt-3">
                    {DAYS_OF_WEEK.map(d => (
                        <div
                            key={d}
                            className="text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)] py-1"
                        >
                            {d}
                        </div>
                    ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-1">
                    {cells.map((day, idx) => {
                        if (day === null) {
                            return <div key={`empty-${idx}`} className="aspect-square" />;
                        }

                        const iso      = toIso(year, monthIndex, day);
                        const count    = drinkData[iso] ?? 0;
                        const cellDate = new Date(year, monthIndex, day);
                        const isToday  = isSameDay(cellDate, today);

                        return (
                            <DayCell
                                key={iso}
                                day={day}
                                iso={iso}
                                count={count}
                                isToday={isToday}
                                onClick={handleDayClick}
                            />
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-[var(--color-border)]">
                    <span className="text-[11px] text-[var(--color-muted)]">Less</span>
                    {(['none', 'light', 'moderate', 'heavy'] as DrinkIntensity[]).map(level => (
                        <div
                            key={level}
                            title={
                                level === 'none'     ? 'No drinks'  :
                                    level === 'light'    ? '1–2 drinks' :
                                        level === 'moderate' ? '3–5 drinks' :
                                            '6+ drinks'
                            }
                            className={`
                                w-4 h-4 rounded-sm
                                border border-[var(--color-border)]
                                ${intensityStyles[level]}
                                ${level === 'none' ? 'bg-[var(--color-surface-muted)]' : ''}
                            `}
                        />
                    ))}
                    <span className="text-[11px] text-[var(--color-muted)]">More</span>
                </div>
            </div>
        );
    }
);

DrinkCalendar.displayName = 'DrinkCalendar';