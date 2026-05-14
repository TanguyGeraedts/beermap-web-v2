import { Card } from '@/components/ui';
import { ChangelogEntry } from '@/types/meta';

interface ChangelogItemProps {
    entry: ChangelogEntry;
    isLatest?: boolean;
}

export const ChangelogItem = ({ entry, isLatest }: ChangelogItemProps) => {
    return (
        <div className="relative pl-8 pb-10 last:pb-0">
            {/* Vertical Timeline Connector */}
            <div
                className="absolute left-2.75 top-2 bottom-0 w-px bg-(--color-border) last:hidden"
                aria-hidden="true"
            />

            {/* Timeline Indicator */}
            <div
                className={`absolute left-0 top-1.5 h-5.5 w-5.5 rounded-full border-4 border-(--color-bg) shadow-sm
                ${isLatest ? 'bg-(--color-primary)' : 'bg-slate-300'}`}
            />

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-bold font-mono text-(--color-text)">
                        {entry.version}
                    </span>
                    {isLatest && (
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-green-200">
                            Current
                        </span>
                    )}
                </div>

                <time className="text-xs text-(--color-muted) font-medium">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </time>

                <Card className="mt-3 overflow-hidden" variant="default">
                    <Card.Body className="p-4 bg-(--color-card-bg)">
                        <ul className="space-y-2.5">
                            {entry.changes.map((change, idx) => (
                                <li key={idx} className="text-sm text-(--color-text) flex gap-3 leading-relaxed">
                                    <span className="text-(--color-primary) font-bold select-none">•</span>
                                    <span>{change}</span>
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};