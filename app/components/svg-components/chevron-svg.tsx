import React from 'react';

interface ChevronSvgProps extends React.SVGProps<SVGSVGElement> {
    direction?: 'left' | 'right' | 'up' | 'down';
}

export const ChevronSvg: React.FC<ChevronSvgProps> = ({ direction = 'down', ...props }) => {
    const getPath = () => {
        switch (direction) {
            case 'left': return "m15 18-6-6 6-6";
            case 'up': return "m18 15-6-6-6 6";
            case 'right': return "m9 18 6-6-6-6";
            case 'down': default: return "m6 9 6 6 6-6";
        }
    };

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d={getPath()} />
        </svg>
    );
};
