import { useNavigate } from 'react-router-dom';
import { useDraftLogs, useDeleteDraftLog, useDeleteAllDraftLogs } from '@/hooks/useDraftLog';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui';
import { Camera, Trash2, Plus, Clock } from "lucide-react";

export const DraftsPage = () => {
    const navigate = useNavigate();
    const { data: drafts, isLoading } = useDraftLogs();
    const deleteDraft = useDeleteDraftLog();
    const deleteAll = useDeleteAllDraftLogs();

    const handleDeleteDraft = async (e: React.MouseEvent, draftId: string) => {
        e.stopPropagation();
        if (window.confirm('Delete this snap?')) {
            deleteDraft.mutate(draftId);
        }
    };

    const handleDeleteAll = () => {
        if (window.confirm('Delete all snaps? This cannot be undone.')) {
            deleteAll.mutate();
        }
    };

    const hasDrafts = (drafts?.length ?? 0) > 0;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Camera size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Drafts</h1>
                </div>

                <div className="flex items-center gap-2">
                    {hasDrafts && (
                        <button
                            onClick={handleDeleteAll}
                            disabled={deleteAll.isPending}
                            className="p-1.5 rounded-xl transition-colors disabled:opacity-40 flex items-center justify-center"
                            style={{
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-surface)',
                                color: '#ef4444'
                            }}
                            title="Delete all snaps"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/snap')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors"
                        style={{
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-muted)',
                        }}
                    >
                        <Plus size={14} strokeWidth={2.5} />
                        Snap
                    </button>
                </div>
            </div>

            {/* List Layout Content */}
            <div className="space-y-3">
                {isLoading ? (
                    <div className="rounded-2xl h-28 animate-pulse" style={{ background: 'var(--color-surface)' }} />
                ) : !hasDrafts ? (
                    <div
                        className="p-8 text-center rounded-2xl border flex flex-col items-center justify-center gap-2"
                        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                        <Clock size={32} style={{ color: 'var(--color-muted)' }} className="opacity-60" strokeWidth={1.5} />
                        <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>No snaps waiting.</p>
                    </div>
                ) : (
                    drafts?.map((draft) => (
                        <div
                            key={draft.id}
                            onClick={() => navigate(`/log?draftId=${draft.id}`)}
                            className="border rounded-2xl overflow-hidden flex h-28 cursor-pointer transition-all active:scale-[0.99]"
                            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                        >
                            <img src={draft.photoUrl} alt="Snap" className="w-28 h-full object-cover" style={{ background: 'var(--color-surface-muted)' }} />
                            <div className="flex-1 p-4 flex flex-col justify-between">
                                <div className="flex items-center gap-1.5" style={{ color: 'var(--color-muted)' }}>
                                    <Clock size={11} />
                                    <span className="text-[11px] font-medium">{formatDistanceToNow(new Date(draft.capturedAt))} ago</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        className="h-8 flex-1 gap-1.5 rounded-xl text-xs font-medium"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/log?draftId=${draft.id}`);
                                        }}
                                    >
                                        Finish
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={(e) => handleDeleteDraft(e, draft.id)}
                                        className="p-2 rounded-xl transition-colors flex items-center justify-center"
                                        style={{ color: '#ef4444', border: '1px solid var(--color-border)', background: 'var(--color-surface-muted)' }}
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};