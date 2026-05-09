import { useState } from 'react';
import { Alert } from '@/components/ui';

export const AlertDisplay = () => {
    const [showAlert, setShowAlert] = useState(true);

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                Alert
            </h2>
            <div className="space-y-3">
                <Alert variant="info" title="Info Alert">
                    This is an informational alert.
                </Alert>

                <Alert variant="success" title="Success Alert">
                    Operation completed successfully.
                </Alert>

                <Alert variant="warning" title="Warning Alert">
                    Please be careful with this action.
                </Alert>

                <Alert variant="error" title="Error Alert">
                    Something went wrong.
                </Alert>

                {showAlert && (
                    <Alert
                        variant="success"
                        title="Dismissible Alert"
                        onClose={() => setShowAlert(false)}
                    >
                        Click the X to dismiss this alert.
                    </Alert>
                )}
            </div>
        </section>
    );
};