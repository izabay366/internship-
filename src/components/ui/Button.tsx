import React from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-accent text-on-primary hover:bg-white/90 active:scale-95 transition-all text-xs tracking-widest uppercase',
      secondary: 'bg-surface-container-highest text-accent hover:bg-surface-container-high transition-all text-xs tracking-widest uppercase',
      outline: 'border border-premium bg-transparent hover:bg-neutral-900 transition-all text-xs tracking-widest uppercase',
      ghost: 'hover:bg-neutral-800 transition-all text-xs tracking-widest uppercase text-on-surface opacity-60 hover:opacity-100',
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
