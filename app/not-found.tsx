'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CONTENT } from './constants/content';
import { Button } from './components/ui-components';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg-off-white px-4 text-center">
            <div className="relative mb-8 transition-transform duration-500 hover:scale-105">
                <div className="absolute -inset-4 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <h1 className="relative text-9xl font-black text-brand-secondary tracking-tighter sm:text-[12rem]">
                    404
                </h1>
            </div>

            <div className="max-w-md space-y-6 relative z-10">
                <h2 className="text-3xl font-bold text-brand-secondary sm:text-4xl">
                    {CONTENT.notFound.title}
                </h2>
                <p className="text-brand-text-muted text-lg leading-relaxed">
                    {CONTENT.notFound.message}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link href="/products" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto !px-8 !py-6 !text-base !font-bold !rounded-2xl shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300">
                            {CONTENT.notFound.goHome}
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
}
