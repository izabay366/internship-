import React from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[10px] uppercase tracking-[0.3em] text-accent opacity-60 font-medium ml-1"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-none border border-premium bg-[#0A0A0A] px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/30 focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            error && 'border-error ring-error/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-error font-medium ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
