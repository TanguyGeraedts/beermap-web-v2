import { useState } from 'react';
import { Card, Input } from '@/components/ui';

export const InputDisplay = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                Input
            </h2>
            <Card variant="default">
                <Card.Body className="space-y-6">
                    <Input
                        label="Basic Input"
                        placeholder="Enter some text..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                    <Input
                        label="With Helper Text"
                        placeholder="Your email"
                        type="email"
                        helperText="We'll never share your email."
                    />

                    <Input
                        label="With Error"
                        placeholder="Required field"
                        error="This field is required"
                    />

                    <div>
                        <p className="text-sm text-(--color-muted) mb-4">
                            Sizes: sm, md, lg
                        </p>
                        <div className="space-y-4">
                            <Input
                                label="Small"
                                inputSize="sm"
                                placeholder="Small input"
                            />
                            <Input
                                label="Medium"
                                inputSize="md"
                                placeholder="Medium input"
                            />
                            <Input
                                label="Large"
                                inputSize="lg"
                                placeholder="Large input"
                            />
                        </div>
                    </div>

                    <Input
                        label="Disabled"
                        placeholder="Can't edit this"
                        disabled
                    />
                </Card.Body>
            </Card>
        </section>
    );
};