import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, leftIcon, rightElement, className = '', id, ...props }, ref) => {
        return (
            <div className="w-full text-left">
                {label && (
                    <label
                        htmlFor={id}
                        className="mb-2.5 block text-[14px] font-semibold text-brand-secondary"
                    >
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-muted transition-colors group-focus-within:text-brand-primary">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={id}
                        className={`
                            w-full rounded-[12px] border-[1.5px] border-brand-border bg-brand-bg-light 
                            px-5 py-4 text-[16px] transition-all duration-200 
                            placeholder:text-brand-text-muted/50
                            focus:border-brand-primary focus:shadow-[0_0_0_4px_rgba(0,181,0,0.1)] focus:outline-none 
                            disabled:opacity-50 disabled:bg-gray-50
                            ${leftIcon ? 'pl-12' : ''} 
                            ${rightElement ? 'pr-12' : ''}
                            ${error ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : ''}
                            ${className}
                        `}
                        {...props}
                    />
                    {rightElement && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                            {rightElement}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
