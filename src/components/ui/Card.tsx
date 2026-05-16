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
    0: 'bg-transparent border-none',
    1: 'bg-[#0A0A0A] border border-premium shadow-none',
    2: 'bg-[#050505] border border-premium shadow-none backdrop-blur-md',
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
