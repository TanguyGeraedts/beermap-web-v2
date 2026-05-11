import { useNavigate } from 'react-router-dom';
import {
    AlertDisplay,
    AvatarDisplay,
    BadgeDisplay,
    ButtonDisplay,
    CardDisplay,
    InputDisplay,
    SkeletonDisplay,
    UserRankPillDisplay,
    Button, SegmentedControlDisplay
} from "@/components/ui";

export const UIComponentsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-(--color-app-bg) p-8">
            <div className="max-w-4xl mx-auto space-y-12">

                <div className="space-y-4">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Settings
                    </Button>

                    <div>
                        <h1 className="text-4xl font-bold text-(--color-text) mb-2">
                            UI Components
                        </h1>
                        <p className="text-(--color-muted)">
                            A showcase of all available UI components with theme support.
                        </p>
                    </div>
                </div>

                {/* Components Showcase */}
                <div className="grid gap-12">
                    <ButtonDisplay />
                    <CardDisplay />
                    <AvatarDisplay/>
                    <UserRankPillDisplay/>
                    <SegmentedControlDisplay/>
                    <InputDisplay />
                    <BadgeDisplay />
                    <AlertDisplay />
                    <SkeletonDisplay />
                </div>
            </div>
        </div>
    );
};