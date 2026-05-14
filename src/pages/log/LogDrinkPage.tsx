import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLogDrink, useLogDrinkFromDraft } from '@/hooks/useDrinkLog';
import { useDraftLog, useDraftLogs } from '@/hooks/useDraftLog';
import { DrinkCatalogItemResponse, LogDrinkRequest } from '@/types';
import { DrinkSearchInput } from '@/components/log/DrinkSearchInput';
import { DrinkDetailsForm } from '@/components/log/DrinkDetailsForm';
import { Alert, Skeleton } from "@/components/ui";

type Step = 'search' | 'details';

export const LogDrinkPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const draftId = searchParams.get('draftId');

    const [step, setStep] = useState<Step>('search');
    const [selectedItem, setSelectedItem] = useState<DrinkCatalogItemResponse | null>(null);
    const [customName, setCustomName] = useState('');
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

    const { mutate: logDrink, isPending } = useLogDrink();
    const { mutate: logFromDraft, isPending: isLogFromDraftPending } = useLogDrinkFromDraft();

    // Primary: try fetching the specific draft (may 404 if endpoint absent)
    const { data: draft, isLoading: isDraftLoading } = useDraftLog(draftId);

    // Fallback: resolve from the list cache if the single-get is unavailable
    const { data: allDrafts } = useDraftLogs();
    const resolvedDraft = draft ?? allDrafts?.find(d => d.id === draftId) ?? null;

    // Request geolocation once on mount so it's ready when the user submits
    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => setCoords({ latitude, longitude }),
            () => { /* denied — coords stay null, field is omitted */ },
            { timeout: 8000 }
        );
    }, []);

    // When arriving from a draft, jump straight to the details step
    useEffect(() => {
        if (resolvedDraft && !photoUrl) {
            setPhotoUrl(resolvedDraft.photoUrl);
            setStep('details');
        }
    }, [resolvedDraft, photoUrl]);

    const handleSelectFromCatalog = (item: DrinkCatalogItemResponse | null) => {
        if (item) {
            setSelectedItem(item);
            setCustomName('');
            setStep('details');
        }
    };

    const handleCustom = (name?: string) => {
        setSelectedItem(null);
        setCustomName(name ?? '');
        setStep('details');
    };

    const handleBack = () => {
        setStep('search');
    };

    const handleSubmit = (payload: LogDrinkRequest) => {
        // Always carry the draft photo forward; never send consumedAt for from-draft
        // requests (the backend derives timing from the draft's capturedAt).
        const photoFinal = payload.photoUrl || photoUrl || undefined;

        if (draftId) {
            const fromDraftPayload = {
                ...payload,
                photoUrl: photoFinal,
                // consumedAt is intentionally omitted — backend uses capturedAt
                consumedAt: undefined,
                // Include geolocation when available
                ...(coords ?? {}),
            };

            logFromDraft(
                { draftId, request: fromDraftPayload },
                {
                    onSuccess: () => {
                        const name = selectedItem?.name ?? customName ?? 'Drink';
                        setSuccessMsg(`${name} logged!`);
                        setSelectedItem(null);
                        setCustomName('');
                        setPhotoUrl(null);
                        setStep('search');
                        setErrorMsg(null);
                        setTimeout(() => navigate('/drafts'), 1500);
                    },
                    onError: () => {
                        setErrorMsg('Something went wrong. Please try again.');
                        setSuccessMsg(null);
                    },
                }
            );
        } else {
            logDrink(
                { ...payload, photoUrl: photoFinal },
                {
                    onSuccess: () => {
                        const name = selectedItem?.name ?? customName ?? 'Drink';
                        setSuccessMsg(`${name} logged!`);
                        setSelectedItem(null);
                        setCustomName('');
                        setPhotoUrl(null);
                        setStep('search');
                        setErrorMsg(null);
                    },
                    onError: () => {
                        setErrorMsg('Something went wrong. Please try again.');
                        setSuccessMsg(null);
                    },
                }
            );
        }
    };

    // Show skeleton while we're waiting for the draft to resolve
    if (draftId && isDraftLoading && !resolvedDraft) {
        return (
            <div className="min-h-screen bg-(--color-background) flex flex-col">
                <div className="px-6 pt-10 pb-4">
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex-1 px-6 flex flex-col gap-5">
                    <Skeleton className="h-20 rounded-xl" />
                </div>
            </div>
        );
    }

    if (step === 'details') {
        return (
            <>
                {errorMsg && (
                    <div className="px-4 pt-4">
                        <Alert variant="error" onClose={() => setErrorMsg(null)}>{errorMsg}</Alert>
                    </div>
                )}
                <DrinkDetailsForm
                    catalogItem={selectedItem}
                    customName={customName}
                    draftPhotoUrl={photoUrl}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    isSubmitting={isPending || isLogFromDraftPending}
                />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-(--color-background) flex flex-col">
            <div className="px-6 pt-10 pb-4">
                <h1 className="text-2xl font-bold text-(--color-text)">Log a drink</h1>
                <p className="text-sm text-(--color-muted) mt-1">What are you drinking?</p>
            </div>

            <div className="flex-1 px-6 flex flex-col gap-5">
                {successMsg && (
                    <Alert variant="success" onClose={() => setSuccessMsg(null)}>
                        {successMsg}
                    </Alert>
                )}

                <DrinkSearchInput
                    onSelect={handleSelectFromCatalog}
                    onCustom={() => handleCustom()}
                    selectedItem={selectedItem}
                />
            </div>
        </div>
    );
};