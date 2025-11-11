import { tv, type VariantProps } from 'tailwind-variants';
import React from 'react';

const input = tv({
  base: 'w-full p-2 border border-gray-300 bg-white cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
  variants: {
    size: {
      sm: 'text-sm h-8',
      md: 'text-base h-10',
      lg: 'text-lg h-12',
    },
    border: {
      none: 'border-none',
      solid: 'border border-gray-300 focus:ring-gray-500',
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'cursor-text',
    },
  },
  defaultVariants: {
    size: 'md',
    border: 'solid',
    isDisabled: false,
  },
});

type InputProps = VariantProps<typeof input> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    type?: string;
    label?: string;
    placeholder?: string;
    loading?: boolean;
    icon?: React.ReactNode;
    backgroundColor?: string;
  };

export const InputCommon: React.FC<InputProps> = ({
  children,
  backgroundColor,
  size,
  border,
  label,
  isDisabled,
  loading = false,
  icon,
  ...rest
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className='mb-4'>
      {label && (
        <label className='block text-gray-700 font-semibold mb-2' htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={`flex items-center gap-2 `}>
        {icon && <span className='text-gray-500'>{icon}</span>}
        <input
          id={inputId}
          className={`outline-none h-full bg-transparent flex-1 ${input({ border, size })} ${backgroundColor}`}
          disabled={loading || isDisabled}
          {...rest}
        />
      </div>
    </div>
  );
};
