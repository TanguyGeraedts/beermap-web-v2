import { Camera, Loader2, Trash2 } from 'lucide-react';
import { useRef, type ChangeEvent } from 'react';

interface DrinkPhotoUploadProps {
    photoUrl: string | null;
    isUploading: boolean;
    onFileSelected: (e: ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
}

export const DrinkPhotoUpload = ({
                                     photoUrl,
                                     isUploading,
                                     onFileSelected,
                                     onRemove
                                 }: DrinkPhotoUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-(--color-text)">Photo</label>
                {photoUrl && !isUploading && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-xs text-red-500 flex items-center gap-1 hover:opacity-80 transition-opacity"
                    >
                        <Trash2 size={12} />
                        <span>Remove</span>
                    </button>
                )}
            </div>

            <div className="flex gap-3">
                {!photoUrl ? (
                    <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="
                            flex flex-col items-center justify-center gap-2
                            w-full h-28 rounded-2xl
                            border-2 border-dashed border-(--color-border)
                            text-(--color-muted) hover:border-(--color-primary) hover:text-(--color-primary)
                            transition-colors bg-(--color-surface-muted)/20
                            disabled:opacity-50 disabled:cursor-not-allowed
                        "
                    >
                        {isUploading ? (
                            <Loader2 size={24} className="animate-spin text-(--color-primary)" />
                        ) : (
                            <>
                                <Camera size={24} strokeWidth={1.5} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-center px-2">
                                    Take photo
                                </span>
                            </>
                        )}
                    </button>
                ) : (
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-(--color-border) shadow-sm bg-(--color-surface)">
                        {isUploading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                <Loader2 size={24} className="animate-spin text-white" />
                            </div>
                        ) : (
                            <img
                                src={photoUrl}
                                alt="Drink log"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={onFileSelected}
            />
        </div>
    );
};