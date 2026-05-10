import { useRef, type KeyboardEvent, type ClipboardEvent } from 'react';

const DISCRIMINATOR_LENGTH = 4;

type DiscriminatorInputProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    helperText?: string;
    disabled?: boolean;
};

/**
 * N-digit discriminator input with individual boxes.
 * Change DISCRIMINATOR_LENGTH at the top to adjust the number of digits.
 * Supports typing, backspace, arrow keys, and paste.
 *
 * @example
 * <DiscriminatorInput
 *   label="Discriminator"
 *   value={discriminator}
 *   onChange={setDiscriminator}
 * />
 */
export const DiscriminatorInput = ({
                                       label,
                                       value,
                                       onChange,
                                       error,
                                       helperText,
                                       disabled = false
                                   }: DiscriminatorInputProps) => {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const digits: (string | null)[] = Array.from(
        { length: DISCRIMINATOR_LENGTH },
        (_, i) => value[i] ?? null
    );

    const focusAt = (index: number) => {
        inputs.current[Math.max(0, Math.min(DISCRIMINATOR_LENGTH - 1, index))]?.focus();
    };

    const emit = (next: (string | null)[]) => {
        onChange(next.map((d) => d ?? '').join('').trimEnd());
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key >= '0' && e.key <= '9') {
            e.preventDefault();
            const next = [...digits];
            next[index] = e.key;
            emit(next);
            if (index < DISCRIMINATOR_LENGTH - 1) focusAt(index + 1);
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            const next = [...digits];
            if (next[index] !== null) {
                // Clear current box, stay here
                next[index] = null;
                emit(next);
            } else if (index > 0) {
                // Already empty, clear previous and move back
                next[index - 1] = null;
                emit(next);
                focusAt(index - 1);
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            focusAt(index - 1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            focusAt(index + 1);
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, DISCRIMINATOR_LENGTH);
        onChange(pasted);
        focusAt(Math.min(pasted.length, DISCRIMINATOR_LENGTH - 1));
    };

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-(--color-text)">
                    {label}
                </label>
            )}

            <div className="flex items-center gap-3">
                {digits.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit ?? ''}
                        disabled={disabled}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onChange={() => {}} // controlled via onKeyDown
                        onClick={() => focusAt(index)}
                        placeholder="_"
                        className={`
                            w-12 h-14
                            text-center text-2xl font-mono font-bold
                            bg-(--color-surface)
                            text-(--color-text)
                            border-2 rounded-lg
                            placeholder:text-(--color-muted)
                            focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-150
                            caret-transparent
                            ${error
                            ? 'border-red-500 focus:ring-red-500'
                            : digit !== null
                                ? 'border-(--color-primary)'
                                : 'border-(--color-border)'
                        }
                        `}
                    />
                ))}
            </div>

            {error && <span className="text-xs text-red-500">{error}</span>}
            {helperText && !error && (
                <span className="text-xs text-(--color-muted)">{helperText}</span>
            )}
        </div>
    );
};