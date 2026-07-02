import { useEffect, useState, SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import {
    useDrinkCatalogItem,
    useUpdateDrinkCatalogItem,
    useDeleteDrinkCatalogItem
} from '@/hooks/useDrinkCatalog';
import { DrinkCategory, UpdateDrinkCatalogItemRequest } from '@/types';
import { DRINK_CATEGORIES } from '@/constants/drinkCategories';
import { Card, Button } from '@/components/ui';

export const EditDrinkCatalogPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: drinkItem, isLoading } = useDrinkCatalogItem(id || null);
    const { mutate: updateDrink, isPending: isUpdating } = useUpdateDrinkCatalogItem();
    const { mutate: deleteDrink, isPending: isDeleting } = useDeleteDrinkCatalogItem();

    const [formData, setFormData] = useState<UpdateDrinkCatalogItemRequest>({
        name: '',
        category: 'BEER' as DrinkCategory,
        subType: '',
        abvPercent: undefined
    });

    // Local temporary state to handle raw user text input smoothly
    const [abvInput, setAbvInput] = useState('');

    // Populate form data once item query returns successfully
    useEffect(() => {
        if (drinkItem) {
            setFormData({
                name: drinkItem.name,
                category: drinkItem.category,
                subType: drinkItem.subType || '',
                abvPercent: drinkItem.abvPercent ?? undefined
            });

            setAbvInput(drinkItem.abvPercent !== null && drinkItem.abvPercent !== undefined
                ? drinkItem.abvPercent.toString()
                : ''
            );
        }
    }, [drinkItem]);

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @ts-ignore
        if (!id || !formData.name.trim()) return;

        updateDrink(
            { id, request: formData },
            {
                onSuccess: () => {
                    navigate('/admin/catalog');
                }
            }
        );
    };

    const handleDelete = () => {
        if (!id) return;
        if (window.confirm('Are you sure you want to delete this item from your catalog?')) {
            deleteDrink(id, {
                onSuccess: () => {
                    navigate('/admin/catalog');
                }
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-2 text-muted">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-sm">Loading drink details...</p>
            </div>
        );
    }

    if (!drinkItem) {
        return (
            <div className="text-center py-12">
                <p className="text-text font-medium">Drink item not found.</p>
                <Button variant="ghost" size="sm" className="mt-4" onClick={() => navigate('/admin/catalog')}>
                    Back to Catalog
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            {/* Header section with split delete option */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/catalog')}
                        className="p-2 rounded-xl text-muted hover:text-text hover:bg-surface-muted transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-text">Edit Drink</h1>
                        <p className="text-sm text-muted">Modify baseline item properties</p>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    className="gap-1.5"
                    onClick={handleDelete}
                    isLoading={isDeleting}
                    disabled={isUpdating}
                >
                    <Trash2 size={15} />
                </Button>
            </div>

            {/* Form Setup */}
            <Card variant="default">
                <form onSubmit={handleSubmit}>
                    <Card.Body className="space-y-4">
                        {/* Drink Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text">Drink Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-2 text-sm rounded-xl border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            />
                        </div>

                        {/* Category Selector */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as DrinkCategory }))}
                                className="w-full px-4 py-2 text-sm rounded-xl border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary transition-all capitalize"
                            >
                                {DRINK_CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat.toLowerCase()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sub-type */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text">Sub-type (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g., IPA, Stout"
                                value={formData.subType || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, subType: e.target.value }))}
                                className="w-full px-4 py-2 text-sm rounded-xl border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            />
                        </div>

                        {/* New ABV % Input */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-muted uppercase">ABV % (Optional)</label>
                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="0.0"
                                value={abvInput}
                                onChange={(e) => {
                                    const normalized = e.target.value.replace(',', '.');
                                    if (/^\d*\.?\d*$/.test(normalized)) {
                                        setAbvInput(e.target.value);
                                        setFormData(prev => ({
                                            ...prev,
                                            abvPercent: normalized === '' || normalized === '.' ? undefined : parseFloat(normalized)
                                        }));
                                    }
                                }}
                                onBlur={() => {
                                    const normalized = abvInput.replace(',', '.');
                                    const parsed = parseFloat(normalized);
                                    if (!isNaN(parsed)) {
                                        setAbvInput(parsed.toString());
                                        setFormData(prev => ({ ...prev, abvPercent: parsed }));
                                    } else {
                                        setAbvInput('');
                                        setFormData(prev => ({ ...prev, abvPercent: undefined }));
                                    }
                                }}
                                className="px-4 h-14 w-36 bg-surface border border-border rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </Card.Body>

                    <Card.Footer className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate('/admin/catalog')}
                            disabled={isUpdating || isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            isLoading={isUpdating}
                            disabled={isDeleting}
                            className="gap-1.5"
                        >
                            Save Changes
                        </Button>
                    </Card.Footer>
                </form>
            </Card>
        </div>
    );
};