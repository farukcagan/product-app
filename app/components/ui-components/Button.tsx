import React from 'react';
import { SpinnerSvg } from '../svg-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-brand-primary text-white hover:bg-brand-primary-hover hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,181,0,0.25)] active:translate-y-0',
        secondary: 'bg-brand-secondary text-white hover:bg-opacity-90 hover:-translate-y-[2px] active:translate-y-0',
        outline: 'border-[1.5px] border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
        ghost: 'text-brand-text-muted hover:text-brand-primary hover:bg-brand-bg-light'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-lg',
        md: 'px-5 py-3 text-base rounded-[10px]',
        lg: 'px-6 py-4 text-lg rounded-[12px]',
        xl: 'p-[18px] text-[18px] rounded-[12px] w-full'
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && (
                <SpinnerSvg className="-ml-1 mr-3 h-5 w-5 text-current" />
            )}
            {!isLoading && leftIcon && <span className="flex items-center">{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </button>
    );
};
