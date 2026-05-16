import React from 'react';
import { cn } from '@/src/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 0 | 1 | 2;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Card = ({ className, level = 1, children, ...props }: CardProps) => {
  const levels = {
    0: 'bg-transparent border-none p-0',
    1: 'bg-surface-container border border-outline rounded-3xl shadow-sm',
    2: 'bg-surface-bright border border-outline rounded-3xl shadow-md',
  };

  return (
    <div
      className={cn('p-8 transition-colors', levels[level], className)}
      {...props}
    >
      {children}
    </div>
  );
};
