'use client';

import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Skeleton } from '../../components/Skeleton';
import { CheckSvg, StarSvg } from '../../components/svg-components';
import { Button } from '../../components/ui-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart, updateCartOnServer } from '../../store/slices/cartSlice';
import { clearSelectedProduct, fetchProductById } from '../../store/slices/productsSlice';
import { RootState } from '../../store/store';


interface Comment {
    id: number;
    body: string;
    postId: number;
    user: {
        id: number;
        username: string;
    };
}

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { selectedProduct: product, loading } = useAppSelector((state: RootState) => state.products);
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
            return;
        }

        if (id) {
            dispatch(fetchProductById(id as string));

            // Fetch comments separately as they are not in the main product service yet
            setCommentsLoading(true);
            axios.get(`https://dummyjson.com/comments/post/${id}`)
                .then(res => setComments(res.data.comments || []))
                .catch(() => setComments([]))
                .finally(() => setCommentsLoading(false));
        }

        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [id, isAuthenticated, router, dispatch]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                thumbnail: product.thumbnail
            }));

            dispatch(updateCartOnServer({
                userId: 1,
                products: [{ id: product.id, quantity: 1 }]
            }));
        }
    };

    if (!isAuthenticated) return null;

    if (loading && !product) return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-[120px]">
                <div className="flex flex-col gap-16 lg:flex-row">
                    <Skeleton className="aspect-square flex-1 rounded-3xl" />
                    <div className="flex-1 space-y-6">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-[200px] w-full" />
                        <Skeleton className="h-12 w-1/3" />
                    </div>
                </div>
            </div>
        </div>
    );

    if (!product && !loading) return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
                <h1 className="text-2xl font-bold text-brand-secondary">Ürün Bulunamadı</h1>
                <Button
                    variant="ghost"
                    onClick={() => router.push('/products')}
                    className="mt-4 !text-brand-primary !font-bold hover:underline !bg-transparent"
                >
                    Ürünlere Geri Dön
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pb-[140px]">
            <Header />

            <main className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 lg:py-20">
                <div className="flex flex-col mt-12 gap-12 lg:gap-20 lg:flex-row">
                    {/* Left: Images */}
                    <div className="flex-1">
                        <div className="mb-6 relative aspect-square overflow-hidden rounded-[32px] bg-gray-50/50 border border-gray-100 group">
                            {product && (
                                <Image
                                    src={product.images[selectedImage] || product.thumbnail}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-12 transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            )}
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                            {product?.images.map((img, idx) => (
                                <Button
                                    key={idx}
                                    variant="ghost"
                                    onClick={() => setSelectedImage(idx)}
                                    className={`!relative !aspect-square !w-24 !flex-shrink-0 !overflow-hidden !rounded-2xl !bg-gray-50 !border-2 !p-0 transition-all duration-300 ${selectedImage === idx ? '!border-brand-primary !ring-4 !ring-brand-primary/10' : '!border-transparent hover:!border-gray-200'
                                        }`}
                                >
                                    <Image src={img} alt={`${product.title} ${idx}`} fill className="object-contain p-2" />
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-1 flex-col">
                        <h1 className="mb-4 text-4xl lg:text-5xl font-black leading-tight text-brand-secondary tracking-tight">
                            {product?.title}
                        </h1>
                        <p className="mb-10 text-lg text-brand-text-muted leading-relaxed max-w-2xl">
                            {product?.description}
                        </p>

                        {/* Color Selection */}
                        <div className="mb-8">
                            <h3 className="mb-4 text-sm font-bold text-brand-secondary">Renk Seç:</h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 pr-6 shadow-sm">
                                    <div className="h-6 w-6 rounded-full bg-[#E5E5E5] border border-gray-100"></div>
                                    <span className="text-[13px] font-bold text-gray-400">Silver</span>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl border border-brand-primary/30 bg-white p-3 pr-6 shadow-sm ring-4 ring-brand-primary/5">
                                    <div className="h-6 w-6 rounded-full bg-[#1A1A1A]"></div>
                                    <span className="text-[13px] font-bold text-brand-secondary">Black</span>
                                    <div className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary">
                                        <CheckSvg width="10" height="10" stroke="white" strokeWidth="4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Selection */}
                        <div className="mb-12">
                            <h3 className="mb-4 text-sm font-bold text-brand-secondary">Özellik Seç:</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative rounded-2xl border-2 border-brand-primary bg-white p-5 shadow-sm">
                                    <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary">
                                        <CheckSvg width="12" height="12" stroke="white" strokeWidth="4" />
                                    </div>
                                    <p className="mb-2 text-[13px] font-bold text-brand-secondary">Ürün Özellik 1</p>
                                    <p className="text-[12px] text-brand-text-muted leading-tight">Lorem Ipsum Dolar Sit Amet</p>
                                </div>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm opacity-60">
                                        <p className="mb-2 text-[13px] font-bold text-gray-400">Ürün Özellik 1</p>
                                        <p className="text-[12px] text-gray-300 leading-tight">Lorem Ipsum Dolar Sit Amet</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="mb-8 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-brand-secondary">Ürün Yorumları</h3>
                            </div>

                            <div className="space-y-8">
                                {commentsLoading ? (
                                    <div className="space-y-4">
                                        <Skeleton className="h-24 w-full rounded-2xl" />
                                        <Skeleton className="h-24 w-full rounded-2xl" />
                                    </div>
                                ) : comments.length > 0 ? (
                                    <>
                                        {comments.map((comment) => (
                                            <div key={comment.id} className="group">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <span className="font-bold text-brand-secondary">{comment.user.username}</span>
                                                    <div className="flex items-center gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarSvg key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-[14px] text-brand-text-muted leading-relaxed">
                                                    {comment.body}
                                                    <button className="ml-2 font-bold text-brand-primary hover:underline">Daha fazla göster</button>
                                                </p>
                                            </div>
                                        ))}
                                        <Button className="mt-4 !bg-brand-secondary !rounded-xl !px-10 !h-12 !font-bold">
                                            Tümünü Gör
                                        </Button>
                                    </>
                                ) : (
                                    <div className="py-10 text-center text-gray-400 italic bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                        Henüz bu ürün için bir yorum yapılmamış.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Bar (Checkout) */}
            <div className="fixed bottom-0 left-0 flex h-[120px] w-full items-center border-t bg-white px-6 lg:px-12 z-50">
                <div className="mx-auto flex w-full max-w-[1400px] items-center">
                    {/* Left: Section Title */}
                    <div className="hidden lg:flex w-[200px] h-[120px] items-center border-r border-gray-100 mr-12">
                        <h2 className="text-2xl font-black text-brand-secondary tracking-tight">Sipariş Özeti</h2>
                    </div>

                    {/* Middle: Product Info */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-[15px] font-bold text-brand-secondary mb-1 line-clamp-1">{product?.title}</h3>
                        <p className="text-[13px] text-brand-text-muted line-clamp-1 max-w-[600px]">{product?.description}</p>
                    </div>

                    {/* Right: Price & Button */}
                    <div className="flex items-center gap-10">
                        <span className="text-[32px] font-bold text-brand-secondary tracking-tight">
                            ${product?.price.toLocaleString()}
                        </span>
                        <Button
                            onClick={handleAddToCart}
                            className="!h-14 !bg-brand-primary !rounded-xl !px-12 !text-[15px] !font-bold hover:!opacity-90"
                        >
                            Sepete Ekle
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

