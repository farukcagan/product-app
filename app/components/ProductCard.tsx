'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from '../store/hooks';
import { addToCart, updateCartOnServer } from '../store/slices/cartSlice';
import { Product } from '../store/slices/productsSlice';
import { StarSvg } from './svg-components';
import { Button } from './ui-components';


interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
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
    };

    return (
        <div className="group flex flex-col rounded-3xl bg-white p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-brand-primary/20 relative overflow-hidden cursor-pointer">
            <Link href={`/products/${product.id}`} className="absolute inset-0 z-0" />

            <div className="relative z-10 pointer-events-none flex flex-1 flex-col">
                <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-gray-50/50">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                    />
                </div>

                <div className="flex flex-1 flex-col">
                    <h3 className="mb-2 text-[15px] font-bold text-brand-secondary line-clamp-1 group-hover:text-brand-primary transition-colors">{product.title}</h3>

                    <div className="flex items-center mb-1">
                        <span className="text-[11px] font-bold text-brand-primary uppercase tracking-widest">{product.category}</span>
                    </div>

                    <p className="mb-4 text-xs text-brand-text-muted line-clamp-2 leading-relaxed">{product.description}</p>

                    <div className="mb-6 mt-auto">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-brand-secondary">${product.price.toLocaleString()}</span>
                            {product.discountPercentage > 0 && (
                                <span className="text-xs text-gray-400 line-through">
                                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-0.5 mt-1.5">
                            {[...Array(5)].map((_, i) => (
                                <StarSvg
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`}
                                />
                            ))}
                            <span className="ml-1 text-[10px] font-bold text-gray-400">({product.rating})</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pointer-events-auto">
                        <Button
                            onClick={handleAddToCart}
                            className="w-full !rounded-xl py-3.5 text-xs"
                        >
                            Sepete Ekle
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

