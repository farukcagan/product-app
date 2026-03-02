'use client';

import { CONTENT } from './constants/content';
import { Button } from './components/ui-components';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] px-4 text-center font-sans">
                <div className="max-w-md space-y-8">
                    <div className="flex justify-center">
                        <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-black text-[#1A1A1A]">Critical Error</h1>
                        <p className="text-[#6B7280] text-lg">
                            {CONTENT.error.message}
                        </p>
                    </div>

                    {error.digest && (
                        <code className="block p-3 rounded-lg bg-gray-100 text-[10px] text-gray-400 font-mono break-all">
                            ID: {error.digest}
                        </code>
                    )}

                    <Button
                        onClick={() => reset()}
                        className="w-full !px-8 !py-6 !text-base !font-bold !rounded-2xl !bg-[#00B500] !text-white shadow-lg shadow-[#00B500]/20"
                    >
                        {CONTENT.error.retry}
                    </Button>
                </div>
            </body>
        </html>
    );
}
