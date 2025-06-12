import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    required?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({ label, name, required, ...rest }) => {
    return (
        <div className="space-y-1">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={name}
                name={name}
                required={required}
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                {...rest}
            />
        </div>
    );
};
