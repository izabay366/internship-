import React from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-on-primary hover:bg-primary/90 active:scale-95 transition-all font-medium rounded-xl',
      secondary: 'bg-accent text-white hover:bg-accent/90 active:scale-95 transition-all font-medium rounded-xl',
      outline: 'border border-outline bg-transparent hover:bg-surface-bright transition-all font-medium rounded-xl',
      ghost: 'hover:bg-surface-bright transition-all font-medium rounded-xl text-on-surface opacity-70 hover:opacity-100',
    };

    const sizes = {
      sm: 'px-4 py-2',
      md: 'px-6 py-3',
      lg: 'px-8 py-4',
      xl: 'px-10 py-5',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
