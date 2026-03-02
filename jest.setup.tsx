import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, fill, priority, className, ...props }: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return (
            <img
                src={src}
                alt={alt}
                className={`${className || ''} ${fill ? 'fill-image' : ''}`}
                data-priority={priority ? 'true' : 'false'}
                {...props}
            />
        );
    },
}));
