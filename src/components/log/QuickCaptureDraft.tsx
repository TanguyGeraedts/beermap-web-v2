import {useRef, useState} from 'react';
import {Camera, Loader2} from 'lucide-react';
import {imageService} from '@/services/imageService';
import {useCreateDraftLog, useDraftLogs} from '@/hooks/useDraftLog';
import {useIsPremium} from '@/hooks/useIsPremium';
import {DRAFT_LIMITS} from '@/config/draftConfig';

export const QuickDraftCapture = () => {
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
            const photoUrl = await imageService.uploadDrinkLogImage(file);

            await createDraft.mutateAsync({
                photoUrl,
                capturedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Quick capture failed:", error);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || isAtLimit}
                className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-3xl transition-all h-36
                    ${isAtLimit
                    ? 'bg-muted/5 border-muted opacity-60 cursor-not-allowed'
                    : 'bg-(--color-surface) border-(--color-border) hover:border-(--color-primary) active:scale-[0.98]'
                }`}
            >
                {isUploading ? (
                    <Loader2 className="animate-spin text-(--color-primary)" size={32} />
                ) : (
                    <Camera size={32} className={isAtLimit ? 'text-muted' : 'text-(--color-primary)'} />
                )}

                <div className="mt-2 text-center">
                    <span className="block font-bold text-sm">
                        {isUploading ? 'Uploading...' : isAtLimit ? 'Draft Limit Reached' : 'Quick Snap'}
                    </span>
                    <span className="text-[10px] text-muted font-medium uppercase tracking-wider">
                        {drafts.length} / {limit} Drafts
                    </span>
                </div>
            </button>

            {isAtLimit && !isPremium && (
                <p className="mt-2 text-[10px] text-center text-amber-600 font-medium">
                    Upgrade to Premium for up to {DRAFT_LIMITS.PREMIUM} drafts
                </p>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};