import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, description }) => {
    return (
        <div className={`bg-white rounded-[20px] border border-brand-border p-6 shadow-sm ${className}`}>
            {(title || description) && (
                <div className="mb-6">
                    {title && <h3 className="text-xl font-bold text-brand-secondary">{title}</h3>}
                    {description && <p className="text-brand-text-muted mt-1">{description}</p>}
                </div>
            )}
            {children}
        </div>
    );
};
