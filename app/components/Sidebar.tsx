'use client';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCategory, setSearchQuery } from '../store/slices/productsSlice';
import { setSidebar } from '../store/slices/uiSlice';
import { useState, useEffect } from 'react';
import { RootState } from '../store/store';
import { Button, Input, Checkbox } from './ui-components';
import { SearchSvg } from './svg-components';

export const Sidebar = () => {
    const dispatch = useAppDispatch();
    const { categories, selectedCategory, searchQuery } = useAppSelector((state: RootState) => state.products);
    const { sidebarOpen } = useAppSelector((state: RootState) => state.ui);
    const [localSearch, setLocalSearch] = useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearch !== searchQuery) {
                dispatch(setSearchQuery(localSearch));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearch, dispatch, searchQuery]);

    useEffect(() => {
        setLocalSearch(searchQuery);
    }, [searchQuery]);

    const handleCategoryToggle = (category: string) => {
        if (selectedCategory === category) {
            dispatch(setCategory(null));
        } else {
            dispatch(setCategory(category));
        }
        if (window.innerWidth < 1024) {
            dispatch(setSidebar(false));
        }
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => dispatch(setSidebar(false))}
            />

            <aside className={`fixed left-0 top-[80px] z-40 h-[calc(100vh-80px)] w-[320px] transform border-r bg-white p-8 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="mb-10">
                    <Input
                        placeholder="Ürün ara..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        leftIcon={<SearchSvg />}
                    />
                </div>

                <div className="flex items-center justify-between mb-8 border-b pb-4">
                    <h2 className="text-lg font-bold text-brand-secondary uppercase tracking-wider">Kategoriler</h2>
                    {selectedCategory && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dispatch(setCategory(null))}
                            className="!text-brand-primary !p-0 !h-auto hover:!bg-transparent hover:underline"
                        >
                            Temizle
                        </Button>
                    )}
                </div>

                <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map((cat) => (
                        <div key={cat} className={`flex items-center p-3 rounded-lg transition-all ${selectedCategory === cat ? 'bg-brand-primary/5 border border-brand-primary/10' : 'hover:bg-gray-50'}`}>
                            <Checkbox
                                checked={selectedCategory === cat}
                                onChange={() => handleCategoryToggle(cat)}
                                label={cat}
                                className="w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
};

