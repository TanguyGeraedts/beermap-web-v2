import {useEffect, useState} from 'react';
import {Beer} from 'lucide-react';

interface Props {
    cheeredByMe: boolean;
    cheersCount: number;
    isPending: boolean;
    onToggle: () => void;
}

export const CheersButton = ({ cheeredByMe, isPending, onToggle }: Props) => {
    const [animating, setAnimating] = useState(false);
    const [particles, setParticles] = useState(false);

    const handleClick = () => {
        if (isPending) return;
        onToggle();

        if (!cheeredByMe) {
            setAnimating(true);
            setParticles(true);
            setTimeout(() => setParticles(false), 600);
        }
    };

    useEffect(() => {
        if (!animating) return;
        const t = setTimeout(() => setAnimating(false), 600);
        return () => clearTimeout(t);
    }, [animating]);

    return (
        <div className="relative inline-flex items-center gap-2">
            {/* Particle burst */}
            {particles && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {PARTICLE_ANGLES.map((angle, i) => (
                        <span
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full"
                            style={{
                                background: 'var(--color-primary)',
                                animation: `cheer-particle 0.55s ease-out forwards`,
                                animationDelay: `${i * 18}ms`,
                                '--angle': `${angle}deg`,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
            )}

            <button
                onClick={handleClick}
                disabled={isPending}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-50 select-none active:scale-95"
                style={{
                    background: cheeredByMe ? 'var(--color-ring-soft)' : 'var(--color-surface-muted)',
                    color: cheeredByMe ? 'var(--color-primary)' : 'var(--color-muted)',
                    border: `1px solid ${cheeredByMe ? 'var(--color-ring)' : 'var(--color-border)'}`,
                }}
            >
            <span
                className="flex items-center justify-center"
                style={{
                    animation: animating ? 'cheers-clink 0.55s ease-out' : undefined,
                }}
            >
                <Beer
                    size={18}
                    fill={cheeredByMe ? "currentColor" : "none"}
                    strokeWidth={cheeredByMe ? 2.5 : 2}
                />
            </span>
                <span>Cheers</span>
            </button>

            <style>{PARTICLE_KEYFRAME}</style>
        </div>
    );
};

const PARTICLE_ANGLES = [0, 60, 120, 180, 240, 300];

const PARTICLE_KEYFRAME = `
@keyframes cheer-particle {
    0%   { transform: translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(
                calc(cos(var(--angle) * 3.14159 / 180) * 22px),
                calc(sin(var(--angle) * 3.14159 / 180) * 22px)
            ) scale(0); opacity: 0; }
}
`;