import { useState } from 'react';
import { useLogDrink } from '@/hooks/useDrinkLog';
import { DrinkCatalogItemResponse } from '@/types';
import {Alert, Button} from "@/components/ui";
import {DrinkSearchInput} from "@/components/log/DrinkSearchInput.tsx";


export const LogDrinkPage = () => {
    const [selectedItem, setSelectedItem] = useState<DrinkCatalogItemResponse | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const { mutate: logDrink, isPending } = useLogDrink();

    const handleLog = () => {
        if (!selectedItem) return;

        logDrink(
            { catalogItemId: selectedItem.id },
            {
                onSuccess: () => {
                    setSuccessMsg(`${selectedItem.name} logged!`);
                    setSelectedItem(null);
                    setErrorMsg(null);
                },
                onError: () => {
                    setErrorMsg('Something went wrong. Please try again.');
                    setSuccessMsg(null);
                },
            }
        );
    };

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
                {errorMsg && (
                    <Alert variant="error" onClose={() => setErrorMsg(null)}>
                        {errorMsg}
                    </Alert>
                )}

                <DrinkSearchInput
                    onSelect={setSelectedItem}
                    selectedItem={selectedItem}
                />
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-6">
                <Button
                    variant="primary"
                    size="lg"
                    className="w-full rounded-2xl"
                    disabled={!selectedItem}
                    isLoading={isPending}
                    onClick={handleLog}
                >
                    Log drink
                </Button>
            </div>
        </div>
    );
};