function toLocalDatetimeValue(iso: string): string {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface LogTimePickerProps {
    consumedAt: string;
    setConsumedAt: (v: string) => void;
}

export const LogTimePicker = ({ consumedAt, setConsumedAt }: LogTimePickerProps) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-(--color-muted) uppercase">Time</label>
        <input
            type="datetime-local"
            value={toLocalDatetimeValue(consumedAt)}
            max={toLocalDatetimeValue(new Date().toISOString())}
            onChange={e => {
                if (e.target.value) setConsumedAt(new Date(e.target.value).toISOString());
            }}
            className="px-4 h-12 bg-(--color-surface) border border-(--color-border) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary) text-sm"
        />
    </div>
);