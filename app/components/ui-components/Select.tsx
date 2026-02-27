import React, { forwardRef } from 'react';
import { ChevronSvg } from '../svg-components';


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string | number; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = '', id, ...props }, ref) => {
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
                    <select
                        ref={ref}
                        id={id}
                        className={`
                            w-full appearance-none rounded-[12px] border-[1.5px] border-brand-border bg-brand-bg-light 
                            px-5 py-4 text-[16px] transition-all duration-200 
                            focus:border-brand-primary focus:shadow-[0_0_0_4px_rgba(0,181,0,0.1)] focus:outline-none 
                            disabled:opacity-50 disabled:bg-gray-50
                            ${error ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : ''}
                            ${className}
                        `}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-muted">
                        <ChevronSvg />

                    </div>
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

Select.displayName = 'Select';
