import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageService } from '@/services/imageService';
import { useCreateDraftLog, useDraftLogs } from '@/hooks/useDraftLog';
import { useIsPremium } from '@/hooks/useIsPremium';
import { DRAFT_LIMITS } from "@/config";
import { Button } from '@/components/ui';
import { Camera, ChevronLeft, Loader2, FolderOpen } from "lucide-react";

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
            const photoUrl = await imageService.uploadDrinkLogImage(file);

            await createDraft.mutateAsync({
                photoUrl,
                capturedAt: new Date().toISOString()
            });

            navigate('/drafts');
        } catch (error) {
            console.error("Snap failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Camera size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Snap</h1>
                </div>

                <div className="flex items-center gap-2">
                    {/* View Drafts Button */}
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate('/drafts')}
                        className="rounded-xl font-medium"
                    >
                        <FolderOpen size={14} />
                        Drafts
                    </Button>

                    {/* Back Button */}
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(-1)}
                        className="rounded-xl font-medium"
                    >
                        <ChevronLeft size={14} strokeWidth={2.5} />
                        Back
                    </Button>
                </div>
            </div>

            {/* Core Snap Action Area */}
            <div className="flex flex-col items-center justify-center py-6">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || isAtLimit}
                    className="w-full aspect-square max-w-sm flex flex-col items-center justify-center border border-dashed rounded-2xl transition-all active:scale-[0.98]"
                    style={{
                        background: 'var(--color-surface)',
                        borderColor: isAtLimit ? 'var(--color-border)' : 'var(--color-primary)',
                        opacity: isAtLimit ? 0.5 : 1
                    }}
                >
                    {isUploading ? (
                        <Loader2 className="animate-spin" size={32} style={{ color: 'var(--color-primary)' }} strokeWidth={2.5} />
                    ) : (
                        <Camera size={32} style={{ color: isAtLimit ? 'var(--color-muted)' : 'var(--color-primary)' }} />
                    )}
                    <p className="mt-4 font-bold text-sm" style={{ color: 'var(--color-text)' }}>
                        {isUploading ? 'Uploading...' : isAtLimit ? 'Limit Reached' : 'Take Photo'}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider mt-1 font-mono" style={{ color: 'var(--color-muted)' }}>
                        {drafts.length} / {limit} Drafts
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