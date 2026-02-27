'use client';

import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { setSidebar } from '../store/slices/uiSlice';
import { RootState } from '../store/store';
import { useRouter } from 'next/navigation';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui-components';
import { SearchSvg, InfoSvg, BellSvg, MenuSvg, ChevronSvg } from './svg-components';


export const Header = () => {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const { sidebarOpen } = useAppSelector((state: RootState) => state.ui);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setIsDropdownOpen(false);
        dispatch(logout());
        router.push('/');
    };

    return (
        <header className="fixed top-0 z-50 flex h-[80px] w-full items-center justify-between border-b bg-white px-4 md:px-8 shadow-sm backdrop-blur-md bg-white/90">
            <div className="flex items-center gap-4 md:gap-12">
                <Button
                    variant="ghost"
                    className="lg:hidden !h-10 !w-10 !p-0 !rounded-full !text-gray-600 hover:!bg-gray-100"
                    onClick={() => dispatch(setSidebar(!sidebarOpen))}
                >
                    <MenuSvg />
                </Button>

                <div className="flex h-[40px] items-center gap-2 cursor-pointer" onClick={() => router.push('/products')}>
                    <Image
                        src="/assets/header-logo-black.png"
                        alt="Octopus Logo"
                        width={170}
                        height={46} />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 mr-4">
                    <Button variant="ghost" className="!h-10 !w-10 !p-0 !rounded-full !text-gray-400 hover:!bg-gray-100 hover:!text-brand-primary">
                        <SearchSvg />

                    </Button>
                    <Button variant="ghost" className="!h-10 !w-10 !p-0 !rounded-full !text-gray-400 hover:!bg-gray-100 hover:!text-brand-primary">
                        <InfoSvg />

                    </Button>
                    <Button variant="ghost" className="relative !h-10 !w-10 !p-0 !rounded-full !text-gray-400 hover:!bg-gray-100 hover:!text-brand-primary">
                        <BellSvg />

                        <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                    </Button>
                </div>

                <div className="relative border-l pl-6" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 group focus:outline-none transition-all duration-300"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-[15px] font-bold text-white border border-brand-primary/20 group-hover:bg-brand-primary-hover transition-all duration-300">
                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </div>
                        <div className="hidden md:flex flex-col items-start mr-2">
                            <span className="text-sm font-bold text-brand-secondary leading-none">{user?.firstName} {user?.lastName}</span>
                            <span className="text-[10px] text-brand-text-muted mt-0.5 uppercase tracking-wider font-bold">Yönetici</span>
                        </div>
                        <ChevronSvg
                            className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    <div className={`absolute right-0 mt-3 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 transition-all duration-300 z-50 ${isDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                        <div className="px-4 py-3 border-b border-gray-50 mb-1">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Hesap Hesabı</p>
                            <p className="text-sm font-bold text-brand-secondary truncate">{user?.firstName} {user?.lastName}</p>
                        </div>

                        <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-primary transition-all"
                        >
                            <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                            Profil Bilgileri
                        </button>

                        <div className="h-px bg-gray-50 my-1"></div>

                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                        >
                            <div className="flex h-5 w-5 items-center justify-center text-red-500">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                            </div>
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

