import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger';
};

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
    return (
        <button
            {...props}
            className={clsx(
                'rounded-md px-4 py-2 font-medium transition-all',
                {
                    'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'primary',
                    'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
                    'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
                },
                className
            )}
        >
            {children}
        </button>
    );
};
