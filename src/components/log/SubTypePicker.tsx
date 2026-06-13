interface SubTypePickerProps {
    subType: string;
    setSubType: (v: string) => void;
    suggestions: string[];
}

export const SubTypePicker = ({ subType, setSubType, suggestions }: SubTypePickerProps) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-(--color-muted) uppercase">Sub-type</label>
        <input
            type="text"
            value={subType}
            onChange={e => setSubType(e.target.value)}
            placeholder="e.g. Lager"
            className="px-4 h-12 bg-(--color-surface) border border-(--color-border) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
        />
        {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
                {suggestions.map(s => (
                    <button
                        key={s}
                        onClick={() => setSubType(s)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            subType === s
                                ? 'bg-(--color-primary) text-(--color-primary-contrast) border-(--color-primary)'
                                : 'bg-(--color-surface) text-(--color-text) border-(--color-border)'
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>
        )}
    </div>
);