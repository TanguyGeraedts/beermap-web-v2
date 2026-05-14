import { useState } from 'react';
import { useLogDrink } from '@/hooks/useDrinkLog';
import { DrinkCatalogItemResponse, LogDrinkRequest } from '@/types';
import { DrinkSearchInput } from '@/components/log/DrinkSearchInput';
import { DrinkDetailsForm } from '@/components/log/DrinkDetailsForm';
import {Alert} from "@/components/ui";

type Step = 'search' | 'details';

export const LogDrinkPage = () => {
    const [step, setStep] = useState<Step>('search');
    const [selectedItem, setSelectedItem] = useState<DrinkCatalogItemResponse | null>(null);
    const [customName, setCustomName] = useState('');
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const { mutate: logDrink, isPending } = useLogDrink();

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
        logDrink(payload, {
            onSuccess: () => {
                const name = selectedItem?.name ?? customName ?? 'Drink';
                setSuccessMsg(`${name} logged!`);
                setSelectedItem(null);
                setCustomName('');
                setStep('search');
                setErrorMsg(null);
            },
            onError: () => {
                setErrorMsg('Something went wrong. Please try again.');
                setSuccessMsg(null);
            },
        });
    };

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
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    isSubmitting={isPending}
                />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-(--color-background) flex flex-col">
            {/* Header */}
            <div className="px-6 pt-10 pb-4">
                <h1 className="text-2xl font-bold text-(--color-text)">Log a drink</h1>
                <p className="text-sm text-(--color-muted) mt-1">What are you drinking?</p>
            </div>

            {/* Body */}
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