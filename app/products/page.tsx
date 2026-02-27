'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, fetchCategories, setCurrentPage } from '../store/slices/productsSlice';
import { ProductCard } from '../components/ProductCard';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { ProductSkeleton } from '../components/Skeleton';
import { useRouter } from 'next/navigation';
import { RootState } from '../store/store';
import { Button, Select } from '../components/ui-components';
import { SearchSvg, ChevronSvg } from '../components/svg-components';


export default function ProductsPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { items, total, loading, selectedCategory, searchQuery, currentPage, itemsPerPage } = useAppSelector((state: RootState) => state.products);
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const skip = (currentPage - 1) * itemsPerPage;
        dispatch(fetchProducts({
            limit: itemsPerPage,
            skip,
            category: selectedCategory,
            search: searchQuery
        }));
    }, [dispatch, currentPage, selectedCategory, searchQuery, itemsPerPage]);

    const totalPages = Math.ceil(total / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setCurrentPage(page));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-brand-bg-off-white">
            <Header />

            <main className="flex pt-[70px]">
                <Sidebar />

                <div className="lg:ml-[320px] flex-1 p-6 lg:p-10 transition-all">
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-[28px] font-extrabold text-brand-secondary tracking-tight">
                                {searchQuery ? `"${searchQuery}" için sonuçlar` : selectedCategory || 'Tüm Ürünler'}
                            </h1>
                            <p className="text-brand-text-muted mt-1 font-medium">{total} ürün bulundu</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {[...Array(itemsPerPage)].map((_, i) => (
                                <ProductSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {items.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 animate-in fade-in duration-500">
                                    {items.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-[100px] text-center">
                                    <div className="mb-6 rounded-full bg-gray-100 p-8">
                                        <SearchSvg width="64" height="64" strokeWidth="1" className="text-gray-400" />

                                    </div>
                                    <h3 className="text-xl font-bold text-brand-secondary">Ürün Bulunamadı</h3>
                                    <p className="text-brand-text-muted mt-2">Arama kriterlerinizi değiştirerek tekrar deneyebilirsiniz.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {total > itemsPerPage && items.length > 0 && (
                                <div className="mt-20 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 text-sm font-bold transition-all ${currentPage === 1
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-[#8E95A2] hover:text-brand-primary'
                                            }`}
                                    >
                                        Prev
                                    </button>

                                    <div className="flex items-center gap-2">
                                        {(() => {
                                            const pages = [];
                                            const delta = 1; // Number of neighbors to show around current page

                                            if (totalPages <= 7) {
                                                for (let i = 1; i <= totalPages; i++) pages.push(i);
                                            } else {
                                                // Always show page 1
                                                pages.push(1);

                                                if (currentPage > 3) {
                                                    pages.push('...');
                                                }

                                                // Neighbors
                                                const start = Math.max(2, currentPage - delta);
                                                const end = Math.min(totalPages - 1, currentPage + delta);

                                                for (let i = start; i <= end; i++) {
                                                    pages.push(i);
                                                }

                                                if (currentPage < totalPages - 2) {
                                                    pages.push('...');
                                                }

                                                // Always show last page
                                                pages.push(totalPages);
                                            }

                                            return pages.map((page, idx) => (
                                                typeof page === 'number' ? (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`h-12 w-12 flex items-center justify-center rounded-2xl text-[15px] font-bold transition-all ${currentPage === page
                                                                ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20'
                                                                : 'bg-white text-brand-secondary border border-gray-100 hover:border-brand-primary/20 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ) : (
                                                    <div key={idx} className="h-12 w-12 flex items-center justify-center text-brand-secondary font-bold">
                                                        {page}
                                                    </div>
                                                )
                                            ));
                                        })()}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 text-sm font-bold transition-all ${currentPage === totalPages
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-brand-secondary hover:text-brand-primary'
                                            }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

