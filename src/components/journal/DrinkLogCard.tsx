import { Flame, MessageSquare } from 'lucide-react';
import { Badge, Card, Rating } from "@/components/ui";
import { DrinkCategory, drinkCategoryConfig, DrinkLogResponse } from "@/types";

interface DrinkLogCardProps {
    drink?: DrinkLogResponse | null;
}

export const DrinkLogCard = ({ drink }: DrinkLogCardProps) => {
    if (!drink) return null;

    const categoryKey = (drink.category || 'OTHER') as DrinkCategory;
    const config = drinkCategoryConfig[categoryKey] || drinkCategoryConfig.OTHER;
    const CategoryIcon = config?.icon || drinkCategoryConfig.OTHER.icon;

    let formattedTime: string | null = null;
    if (drink.consumedAt) {
        const date = new Date(drink.consumedAt);
        if (!isNaN(date.getTime())) {
            formattedTime = date.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    }

    const quantity = drink.quantity || 1;
    const abvPercent = typeof drink.abvPercent === 'number' ? drink.abvPercent : null;

    return (
        <Card variant="default">
            <Card.Body className="p-4! flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3 items-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 bg-(--color-surface-muted) border border-(--color-border)">
                            {CategoryIcon && <CategoryIcon size={20} className={config?.color} />}
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-(--color-text) leading-tight">
                                {drink.displayName || drink.customDrinkName || 'Unknown Drink'}
                            </h3>
                            <p className="text-xs text-(--color-muted) flex items-center gap-1.5 mt-0.5">
                                <span>{config?.label || 'Other'}</span>
                                {formattedTime && (
                                    <>
                                        <span className="inline-block w-1 h-1 rounded-full bg-(--color-border)" />
                                        <span className="font-medium">{formattedTime}</span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Safe Rating boundary checking */}
                    {typeof drink.rating === 'number' && drink.rating >= 0 && (
                        <Rating value={drink.rating} size="lg" />
                    )}
                </div>

                <div className="flex flex-wrap gap-1.5 items-center">
                    {drink.subType && (
                        <Badge variant="primary" size="sm">
                            {drink.subType}
                        </Badge>
                    )}

                    {/* Guarded .toFixed() to ensure it only fires on valid numbers */}
                    {abvPercent !== null && (
                        <Badge variant="default" size="sm" className="gap-1">
                            <Flame size={10} className="text-orange-500" />
                            {abvPercent.toFixed(1)}% ABV
                        </Badge>
                    )}

                    {drink.volumeMl && (
                        <Badge variant="default" size="sm">
                            {drink.volumeMl}ml {quantity > 1 && `(x${quantity})`}
                        </Badge>
                    )}
                </div>

                {drink.description && (
                    <div className="flex gap-1.5 items-start bg-(--color-surface-muted) p-2 rounded-md border border-(--color-border) text-xs text-(--color-muted)">
                        <MessageSquare size={12} className="mt-0.5 shrink-0 text-(--color-primary)" />
                        <p className="italic line-clamp-2">{drink.description}</p>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};