import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ScrollText } from 'lucide-react';
import { Button, Card, SegmentedControl, VersionPill } from '@/components/ui';

type LegalTab = 'terms' | 'privacy';

export const LegalPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<LegalTab>('terms');

    return (
        <main className="min-h-screen bg-(--color-bg) py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="w-fit"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back
                    </Button>

                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-black text-(--color-text)">Legal Center</h1>
                        <VersionPill />
                    </div>
                </div>

                {/* Tab Switcher */}
                <SegmentedControl
                    fullWidth
                    value={activeTab}
                    onChange={(val) => setActiveTab(val as LegalTab)}
                    options={[
                        { label: 'Terms of Service', value: 'terms' },
                        { label: 'Privacy Policy', value: 'privacy' }
                    ]}
                />

                <Card variant="default" className="shadow-sm">
                    <Card.Body className="prose prose-slate max-w-none py-8">
                        {activeTab === 'terms' ? <TermsContent /> : <PrivacyContent />}
                    </Card.Body>
                    <Card.Footer className="flex justify-center italic text-xs text-(--color-muted)">
                        Last Updated: May 14, 2026
                    </Card.Footer>
                </Card>
            </div>
        </main>
    );
};

const TermsContent = () => (
    <div className="space-y-6 text-(--color-text)">
        <section className="flex gap-4">
            <ScrollText className="shrink-0 text-(--color-primary)" />
            <div>
                <h2 className="text-xl font-bold mb-2">1. Terms of Use</h2>
                <p className="text-sm leading-relaxed text-(--color-muted)">
                    By accessing BeerMap (the "App"), you agree to be bound by these terms.
                    The App is provided for personal, non-commercial use only. You must be
                    of legal drinking age in your jurisdiction to use the social features
                    of this application.
                </p>
            </div>
        </section>

        <section className="ml-10 space-y-4">
            <h3 className="font-bold">2. User Conduct</h3>
            <p className="text-sm text-(--color-muted)">
                You agree not to upload content that is illegal, offensive, or infringes
                on the rights of others. We reserve the right to terminate accounts that
                violate our community standards.
            </p>

            <h3 className="font-bold">3. Disclaimer</h3>
            <p className="text-sm text-(--color-muted)">
                BeerMap does not encourage excessive alcohol consumption. Always drink
                responsibly and never drive under the influence. The data provided in
                the catalog is for informational purposes only.
            </p>
        </section>
    </div>
);

const PrivacyContent = () => (
    <div className="space-y-6 text-(--color-text)">
        <section className="flex gap-4">
            <ShieldCheck className="shrink-0 text-(--color-primary)" />
            <div>
                <h2 className="text-xl font-bold mb-2">Privacy Policy</h2>
                <p className="text-sm leading-relaxed text-(--color-muted)">
                    Your privacy is paramount. This policy explains how we handle your
                    data when you use BeerMap.
                </p>
            </div>
        </section>

        <section className="ml-10 space-y-4">
            <h3 className="font-bold underline decoration-(--color-primary)">What we collect:</h3>
            <ul className="list-disc list-inside text-sm text-(--color-muted) space-y-1">
                <li>Google Account Information (Email, Name, Avatar)</li>
                <li>Drink logs and ratings you explicitly create</li>
                <li>Friendship connections and blocks</li>
            </ul>

            <h3 className="font-bold">How we use it:</h3>
            <p className="text-sm text-(--color-muted)">
                We use your data strictly to provide the social features of the App.
                We do not sell your personal information to third parties. Data is stored
                securely and used to sync your drink history across devices.
            </p>
        </section>
    </div>
);