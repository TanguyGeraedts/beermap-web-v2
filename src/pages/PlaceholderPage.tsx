import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlaceholderPageProps {
    title: string;
    icon?: LucideIcon | null;
    description?: string;
}

export const PlaceholderPage = ({ title, icon: Icon, description }: PlaceholderPageProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            {/* Only render the icon and its background if Icon exists */}
            {Icon && (
                <div className="p-4 rounded-full bg-(--color-surface-muted) mb-6">
                    <Icon size={48} className="text-(--color-primary)" strokeWidth={1.5} />
                </div>
            )}

            <h1 className="text-2xl font-bold mb-2">{title}</h1>

            <p className="text-(--color-muted) max-w-xs mb-8">
                {description || `The ${title.toLowerCase()} feature is coming soon. Stay tuned!`}
            </p>

            <button
                onClick={() => navigate('/')}
                className="px-6 py-2 rounded-full bg-(--color-primary) text-(--color-primary-contrast) font-medium transition-transform active:scale-95"
            >
                Go Home
            </button>
        </div>
    );
};