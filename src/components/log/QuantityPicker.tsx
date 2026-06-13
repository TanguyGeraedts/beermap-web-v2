interface QuantityPickerProps {
    quantity: number;
    setQuantity: (q: number | ((prev: number) => number)) => void;
}

export const QuantityPicker = ({ quantity, setQuantity }: QuantityPickerProps) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-(--color-muted) uppercase">Quantity</label>
        <div className="flex items-center gap-3">
            <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-14 h-14 rounded-2xl bg-(--color-surface) border border-(--color-border) text-2xl font-light text-(--color-text) flex items-center justify-center active:scale-95 transition-transform"
            >
                −
            </button>
            <span className="w-10 text-center text-xl font-bold text-(--color-text)">{quantity}</span>
            <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-14 h-14 rounded-2xl bg-(--color-surface) border border-(--color-border) text-2xl font-light text-(--color-text) flex items-center justify-center active:scale-95 transition-transform"
            >
                +
            </button>
        </div>
    </div>
);