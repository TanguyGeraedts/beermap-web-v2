import { useChangelog } from '@/hooks/useMeta';
import { Button } from '@/components/ui';
import { ArrowLeft, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {ChangelogItem} from "@/components/meta/ChangelogItem.tsx";

export const ChangelogPage = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError, refetch } = useChangelog();

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            {/* Header */}
            <header className="mb-10">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="mb-6 -ml-2 text-slate-500"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                </Button>

                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <History size={24} className="text-slate-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-(--color-text)">Changelog</h1>
                </div>
                <p className="text-slate-500">
                    Stay up to date with the latest features and improvements to DrinkLog.
                </p>
            </header>

            {/* Content States */}
            {isLoading && (
                <div className="space-y-8 animate-pulse">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-40 bg-slate-100 rounded-xl" />
                    ))}
                </div>
            )}

            {isError && (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                    <p className="text-red-500 font-medium mb-4">Failed to load history</p>
                    <Button onClick={() => refetch()} variant="ghost" size="sm">
                        Try Again
                    </Button>
                </div>
            )}

            {data && (
                <div className="flex flex-col">
                    {data.entries.map((entry, index) => (
                        <ChangelogItem
                            key={entry.version}
                            entry={entry}
                            isLatest={index === 0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};