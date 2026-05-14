import { useNavigate } from 'react-router-dom';
import { useDraftLogs } from '@/hooks/useDraftLog';
import { formatDistanceToNow } from 'date-fns';
import { ChevronLeft, Edit3, Clock, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui';

export const DraftsPage = () => {
    const navigate = useNavigate();
    const { data: drafts, isLoading } = useDraftLogs(); //

    return (
        <div className="min-h-screen bg-(--color-background) flex flex-col">
            <div className="px-6 pt-10 pb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-surface rounded-full">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">My Snaps</h1>
                </div>
                <button
                    onClick={() => navigate('/snap')}
                    className="p-3 bg-primary text-white rounded-2xl shadow-lg active:scale-90 transition-transform"
                >
                    <Plus size={20} />
                </button>
            </div>

            <div className="flex-1 px-6 pb-10 flex flex-col gap-4">
                {isLoading ? (
                    <p className="text-center py-10 text-muted">Loading snaps...</p>
                ) : drafts?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-muted opacity-40">
                        <Clock size={64} strokeWidth={1} className="mb-4" />
                        <p className="font-medium text-center">No snaps waiting.<br/>Take a photo to start!</p>
                    </div>
                ) : (
                    drafts?.map((draft) => (
                        <div key={draft.id} className="bg-surface border border-border rounded-2xl overflow-hidden flex h-28 shadow-sm">
                            <img src={draft.photoUrl} alt="Snap" className="w-28 h-full object-cover bg-muted" />
                            <div className="flex-1 p-4 flex flex-col justify-between">
                                <div className="flex items-center gap-1.5 text-muted">
                                    <Clock size={12} />
                                    <span className="text-xs font-medium">{formatDistanceToNow(new Date(draft.capturedAt))} ago</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        className="h-9 flex-1 gap-2 rounded-xl"
                                        onClick={() => navigate(`/log?draftId=${draft.id}`)} // Goes to LogDrinkPage
                                    >
                                        <Edit3 size={14} /> Finish
                                    </Button>
                                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-xl">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};