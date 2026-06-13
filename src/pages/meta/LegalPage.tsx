import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SegmentedControl, VersionPill, Button } from '@/components/ui';
import { Scale, ChevronLeft } from 'lucide-react';

type LegalTab = 'terms' | 'privacy';

export const LegalPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<LegalTab>('terms');

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Scale size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Legal Center</h1>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="rounded-xl"
                >
                    <ChevronLeft size={14} strokeWidth={2.5} />
                    Back
                </Button>
            </div>

            <SegmentedControl
                fullWidth
                value={activeTab}
                onChange={(val) => setActiveTab(val as LegalTab)}
                options={[
                    { label: 'Terms of Service', value: 'terms' },
                    { label: 'Privacy Policy', value: 'privacy' }
                ]}
            />

            <div
                className="p-5 rounded-2xl border space-y-6"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
                {activeTab === 'terms' ? <TermsContent /> : <PrivacyContent />}

                <div
                    className="flex items-center justify-between pt-4 border-t flex-row"
                    style={{ borderColor: 'var(--color-border)' }}
                >
                    <span className="text-[10px] font-mono italic" style={{ color: 'var(--color-muted)' }}>
                        Last Updated: May 14, 2026
                    </span>
                    <VersionPill />
                </div>
            </div>
        </div>
    );
};

const TermsContent = () => (
    <div className="space-y-5" style={{ color: 'var(--color-text)' }}>
        <div className="space-y-1.5">
            <h2 className="text-sm font-bold tracking-tight">1. Terms of Use</h2>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                By accessing BeerMap (the "App"), you agree to be bound by these terms.
                The App is provided for personal, non-commercial use only. You must be
                of legal drinking age in your jurisdiction to use the social features
                of this application.
            </p>
        </div>
        <div className="space-y-1.5">
            <h3 className="text-sm font-bold tracking-tight">2. User Conduct</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                You agree not to upload content that is illegal, offensive, or infringes
                on the rights of others. We reserve the right to terminate accounts that
                violate our community standards.
            </p>
        </div>
        <div className="space-y-1.5">
            <h3 className="text-sm font-bold tracking-tight">3. Disclaimer</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                BeerMap does not encourage excessive alcohol consumption. Always drink
                responsibly and never drive under the influence. The data provided in
                the catalog is for informational purposes only.
            </p>
        </div>
    </div>
);

const PrivacyContent = () => (
    <div className="space-y-5" style={{ color: 'var(--color-text)' }}>
        <div className="space-y-1.5">
            <h2 className="text-sm font-bold tracking-tight">Privacy Policy</h2>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Your privacy is paramount. This policy explains how we handle your
                data when you use BeerMap.
            </p>
        </div>
        <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
                What we collect:
            </h3>
            <ul className="list-disc list-inside text-xs space-y-1" style={{ color: 'var(--color-muted)' }}>
                <li>Google Account Information (Email, Name, Avatar)</li>
                <li>Drink logs and ratings you explicitly create</li>
                <li>Friendship connections and blocks</li>
            </ul>
        </div>
        <div className="space-y-1.5">
            <h3 className="text-sm font-bold tracking-tight">How we use it:</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                We use your data strictly to provide the social features of the App.
                We do not sell your personal information to third parties. Data is stored
                securely and used to sync your drink history across devices.
            </p>
        </div>
    </div>
);