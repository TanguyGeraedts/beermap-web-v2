import { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useCreateDrinkCatalogItem } from '@/hooks/useDrinkCatalog';
import { DrinkCategory, CreateDrinkCatalogItemRequest } from '@/types';
import { DRINK_CATEGORIES } from '@/constants/drinkCategories';
import { Card, Button } from '@/components/ui';

export const AddDrinkCatalogPage = () => {
    const navigate = useNavigate();
    const { mutate: createDrink, isPending } = useCreateDrinkCatalogItem();

    const [formData, setFormData] = useState<CreateDrinkCatalogItemRequest>({
        name: '',
        category: 'BEER' as DrinkCategory,
        subType: '',
        abvPercent: undefined
    });

    // Local temporary state to handle raw user text input smoothly (e.g., trailing decimal points)
    const [abvInput, setAbvInput] = useState('');

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        createDrink(formData, {
            onSuccess: () => {
                navigate('/admin/catalog');
            }
        });
    };

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => navigate('/admin/catalog')}
                    className="p-2 rounded-xl text-muted hover:text-text hover:bg-surface-muted transition-colors cursor-pointer"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-text">Add New Drink</h1>
                    <p className="text-sm text-muted">Create a new baseline item for your drink logs</p>
                </div>
            </div>

            {/* Form Card */}
            <Card variant="default">
                <form onSubmit={handleSubmit}>
                    <Card.Body className="space-y-4">
                        {/* Drink Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text">Drink Name *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., Hazy Little Thing"
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
                                placeholder="e.g., IPA, Cabernet Sauvignon, Sour"
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
                                        // Save raw numeric value if valid, otherwise undefined
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
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            isLoading={isPending}
                            className="gap-1.5"
                        >
                            <Plus size={16} />
                            Save Item
                        </Button>
                    </Card.Footer>
                </form>
            </Card>
        </div>
    );
};