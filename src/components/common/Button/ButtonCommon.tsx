import { tv, type VariantProps } from 'tailwind-variants';
import React from 'react';

export const buttonStyles = tv({
  base: 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
  variants: {
    color: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    radius: {
      circle: 'rounded-full',
      rounded: 'rounded-lg',
      square: 'rounded-none',
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'cursor-pointer',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    radius: 'rounded',
    isDisabled: false,
    fullWidth: false,
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    icon?: React.ReactNode;
  };
export const button = buttonStyles; // Exporting the button variant for use in other components
export const ButtonCommon: React.FC<ButtonProps> = React.memo(
  ({ children, color, size, fullWidth, radius, loading = false, icon, className, isDisabled, ...rest }) => {
    return (
      <button
        className={buttonStyles({ color, size, radius, fullWidth, isDisabled, className })}
        disabled={loading || isDisabled}
        {...rest}
      >
        {loading && <span className='loader'>loading...</span>}
        {icon && <span className='mr-2'>{icon}</span>}
        {children}
      </button>
    );
  },
);
