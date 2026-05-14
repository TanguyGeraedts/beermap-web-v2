import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Loader2, ChevronLeft } from 'lucide-react';
import { imageService } from '@/services/imageService';
import { useCreateDraftLog, useDraftLogs } from '@/hooks/useDraftLog';
import { useIsPremium } from '@/hooks/useIsPremium';
import { DRAFT_LIMITS } from '@/config/draftConfig';

export const SnapPage = () => {
    const navigate = useNavigate();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: drafts = [] } = useDraftLogs();
    const { isPremium } = useIsPremium();
    const createDraft = useCreateDraftLog();

    const limit = isPremium ? DRAFT_LIMITS.PREMIUM : DRAFT_LIMITS.FREE;
    const isAtLimit = drafts.length >= limit;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || isAtLimit) return;

        try {
            setIsUploading(true);
            const photoUrl = await imageService.uploadDrinkLogImage(file); //

            await createDraft.mutateAsync({
                photoUrl,
                capturedAt: new Date().toISOString()
            });

            navigate('/drafts'); // Go to list after successful snap
        } catch (error) {
            console.error("Snap failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-(--color-background) flex flex-col">
            <div className="px-6 pt-10 pb-4 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-surface rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold">Snap a Drink</h1>
            </div>

            <div className="flex-1 px-6 flex flex-col items-center justify-center">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || isAtLimit}
                    className={`w-full aspect-square max-w-sm flex flex-col items-center justify-center border-2 border-dashed rounded-[3rem] transition-all
                        ${isAtLimit ? 'bg-muted/5 border-muted opacity-50' : 'bg-surface border-primary active:scale-95'}`}
                >
                    {isUploading ? (
                        <Loader2 className="animate-spin text-primary" size={48} />
                    ) : (
                        <Camera size={48} className={isAtLimit ? 'text-muted' : 'text-primary'} />
                    )}
                    <p className="mt-4 font-bold text-lg">
                        {isUploading ? 'Uploading...' : isAtLimit ? 'Limit Reached' : 'Take Photo'}
                    </p>
                    <p className="text-xs text-muted uppercase tracking-widest mt-1">
                        {drafts.length} / {limit} Drafts Used
                    </p>
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};