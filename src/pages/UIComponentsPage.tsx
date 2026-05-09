import {
    AlertDisplay,
    AvatarDisplay,
    BadgeDisplay,
    ButtonDisplay,
    CardDisplay,
    InputDisplay,
    SkeletonDisplay, UserRankPillDisplay
} from "@/components/ui";


export const UIComponentsPage = () => {
    return (
        <div className="min-h-screen bg-(--color-app-bg) p-8">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold text-(--color-text) mb-2">
                        UI Components
                    </h1>
                    <p className="text-(--color-muted)">
                        A showcase of all available UI components with theme support.
                    </p>
                </div>

                {/* Components */}
                <ButtonDisplay />
                <CardDisplay />
                <AvatarDisplay/>
                <UserRankPillDisplay/>
                <InputDisplay />
                <BadgeDisplay />
                <AlertDisplay />
                <SkeletonDisplay />
            </div>
        </div>
    );
};