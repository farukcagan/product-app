'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONTENT } from './constants/content';
import { Button } from './components/ui-components';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg-off-white px-4 text-center">
            <div className="relative mb-12 transition-transform duration-500">
                <div className="absolute -inset-8 bg-red-100 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative flex items-center justify-center h-48 w-48 mx-auto -translate-x-1/2">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-40 w-40 rounded-full border-4 border-dashed border-red-500/20 animate-spin-slow"></div>

                    <svg
                        className="relative h-20 w-20 text-red-500 drop-shadow-lg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
            </div>

            <div className="max-w-md space-y-6 relative z-10">
                <h2 className="text-3xl font-bold text-brand-secondary sm:text-4xl">
                    {CONTENT.error.title}
                </h2>

                <p className="text-brand-text-muted text-lg leading-relaxed">
                    {CONTENT.error.message}
                </p>

                {error.digest && (
                    <code className="block p-3 rounded-lg bg-gray-100 text-[10px] text-gray-500 font-mono tracking-widest break-all mb-4">
                        ERROR_ID: {error.digest}
                    </code>
                )}

                <div className="group flex flex-col items-center justify-center gap-4 pt-4">
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Button
                            onClick={() => reset()}
                            className="w-full sm:w-auto !px-8 !py-6 !text-base !font-bold !rounded-2xl shadow-lg !bg-brand-primary !text-white hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            {CONTENT.error.retry}
                        </Button>

                        <Link href="/products" className="w-full sm:w-auto">
                            <Button
                                variant="ghost"
                                className="w-full sm:w-auto !px-8 !py-6 !text-base !font-bold !rounded-2xl !bg-white border-2 border-transparent hover:!border-brand-primary/20 hover:!bg-gray-50 transition-all duration-300"
                            >
                                {CONTENT.error.goHome}
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                        <Image
                            src="/assets/header-logo-black.png"
                            alt={CONTENT.common.logoAlt}
                            width={100}
                            height={26}
                            className="grayscale brightness-0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
