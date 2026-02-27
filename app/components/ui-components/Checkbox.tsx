import React, { forwardRef } from 'react';
import { CheckSvg } from '../svg-components';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className = '', id, ...props }, ref) => {
        return (
            <label className={`flex cursor-pointer select-none items-center gap-3 text-[15px] text-brand-secondary group ${className}`}>
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        ref={ref}
                        id={id}
                        className="peer sr-only"
                        {...props}
                    />
                    <div className="h-5 w-5 rounded border-[1.5px] border-brand-border transition-all peer-checked:border-brand-primary peer-checked:bg-brand-primary group-hover:border-brand-primary"></div>
                    <CheckSvg className="absolute inset-0 h-5 w-5 scale-0 text-white transition-transform peer-checked:scale-75" />
                </div>
                {label && <span className="group-hover:text-brand-primary transition-colors">{label}</span>}
            </label>
        );
    }
);

Checkbox.displayName = 'Checkbox';
