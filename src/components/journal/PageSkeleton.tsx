import { Skeleton } from "@/components/ui";

export const PageSkeleton = () => (
    <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <Skeleton width="w-10" height="h-10" rounded="lg" />
                <Skeleton width="w-44" height="h-7" />
            </div>
            <Skeleton width="w-24" height="h-9" />
        </div>

        <div className="grid grid-cols-3 gap-3">
            <Skeleton height="h-20" rounded="lg" />
            <Skeleton height="h-20" rounded="lg" />
            <Skeleton height="h-20" rounded="lg" />
        </div>

        <div className="space-y-3 pt-2">
            <Skeleton height="h-28" rounded="lg" />
            <Skeleton height="h-28" rounded="lg" />
        </div>
    </div>
);