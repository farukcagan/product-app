import React from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> { }

export const CheckSvg: React.FC<SvgProps> = (props) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M20 6 9 17l-5-5" />
    </svg>
);
