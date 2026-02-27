'use client';

import { useState, useEffect } from 'react';
import { CONTENT } from '../constants/content';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, clearError } from '../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '../store/store';
import { Button, Input, Checkbox } from './ui-components';
import { AlertSvg, EyeSvg } from './svg-components';


export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('emilys');
    const [password, setPassword] = useState('emilyspass');

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/products');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    return (
        <section className="flex flex-1 items-center justify-center bg-brand-bg-off-white px-5 py-[60px] lg:px-10 lg:py-10">
            <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center">
                    <h2 className="mb-3 text-[36px] font-bold tracking-tight text-brand-secondary">{CONTENT.login.welcome}</h2>
                    <p className="mb-12 text-[16px] text-brand-text-muted">{CONTENT.login.subtitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-200">
                            <AlertSvg />

                            <span className="font-medium italic">{error}</span>
                        </div>
                    )}

                    <Input
                        label={CONTENT.login.emailLabel}
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={CONTENT.login.emailPlaceholder}
                        required
                        disabled={loading}
                    />

                    <Input
                        label={CONTENT.login.passwordLabel}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={CONTENT.login.passwordPlaceholder}
                        required
                        disabled={loading}
                        rightElement={
                            <Button
                                type="button"
                                variant="ghost"
                                className="!p-0 !h-auto !text-brand-text-muted hover:!text-brand-primary !bg-transparent pr-1"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                <EyeSvg show={showPassword} />

                            </Button>
                        }
                    />

                    <Checkbox
                        label={CONTENT.login.rememberMe}
                        id="rememberMe"
                    />

                    <Button
                        type="submit"
                        size="xl"
                        isLoading={loading}
                    >
                        {loading ? 'Giriş Yapılıyor...' : CONTENT.login.buttonText}
                    </Button>
                </form>

                {isAuthenticated && (
                    <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-xl text-center font-medium border border-green-100 animate-in fade-in duration-300">
                        Giriş Başarılı! Yönlendiriliyorsunuz...
                    </div>
                )}
            </div>
        </section>
    );
};

