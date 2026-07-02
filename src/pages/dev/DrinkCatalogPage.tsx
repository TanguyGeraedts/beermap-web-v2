import { useState } from 'react';
import { Search, Loader2, Plus, Wine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDrinkCatalogItems, useDrinkCatalogSearchByName } from '@/hooks/useDrinkCatalog';
import { Card, Button } from '@/components/ui';

export const DrinkCatalogPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: allDrinks,
        isLoading: isLoadingAll
    } = useDrinkCatalogItems();

    const trimmedQuery = searchQuery.trim();
    const {
        data: searchedDrinks,
        isLoading: isLoadingSearch
    } = useDrinkCatalogSearchByName(trimmedQuery || null);

    const isSearching = trimmedQuery.length > 0;
    const drinks = isSearching ? searchedDrinks : allDrinks;
    const isLoading = isSearching ? isLoadingSearch : isLoadingAll;

    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Wine size={22} className="text-primary" />
                    <h1 className="text-2xl font-bold text-text">Drink Catalog</h1>
                </div>

                <Button
                    variant="primary"
                    size="sm"
                    className="gap-1.5 rounded-xl px-4"
                    onClick={() => navigate('/admin/catalog/new')}
                >
                    <Plus size={16} />
                    Add Drink
                </Button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-md">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                    type="text"
                    placeholder="Search drinks by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
            </div>

            {/* Catalog Grid / Loading / Empty States */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted">
                    <Loader2 className="animate-spin" size={32} />
                    <p className="text-sm">Loading catalog items...</p>
                </div>
            ) : !drinks || drinks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center rounded-xl bg-surface-muted border border-border p-6">
                    <p className="text-base font-medium text-text mb-1">No drinks found</p>
                    <p className="text-sm text-muted">
                        {isSearching ? "Try checking your spelling or adjusting your search term." : "Your catalog is empty. Start by adding a drink!"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {drinks.map((drink) => (
                        <Card
                            key={drink.id}
                            variant="default"
                            className="hover:border-primary transition-colors cursor-pointer"
                            onClick={() => navigate(`/admin/catalog/${drink.id}/edit`)}
                        >
                            <Card.Body className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-lg text-text">
                                        {drink.name}
                                    </h3>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-muted border border-border text-muted capitalize">
                                        {drink.category?.toLowerCase()}
                                    </span>
                                </div>
                                {drink.subType && (
                                    <p className="text-xs text-muted">
                                        Sub-type: {drink.subType}
                                    </p>
                                )}
                            </Card.Body>
                            <Card.Footer className="flex justify-end py-2 px-6">
                                <span className="text-xs font-medium text-primary">
                                    View Details →
                                </span>
                            </Card.Footer>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};