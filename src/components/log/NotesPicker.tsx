interface NotesPickerProps {
    notes: string;
    setNotes: (v: string) => void;
}

export const NotesPicker = ({ notes, setNotes }: NotesPickerProps) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-(--color-muted) uppercase">Notes</label>
        <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Tasting notes..."
            rows={3}
            className="px-4 py-3 bg-(--color-surface) border border-(--color-border) rounded-2xl resize-none focus:ring-2 focus:ring-(--color-primary) outline-none text-sm"
        />
    </div>
);