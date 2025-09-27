import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export default function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn(className)}
        {...props}
    >
        <g>
            <circle cx="35" cy="40" r="8" fill="hsl(var(--primary))" />
            <circle cx="65" cy="40" r="8" fill="hsl(var(--primary))" opacity="0.8"/>
            <circle cx="50" cy="65" r="8" fill="hsl(var(--primary))" opacity="0.6"/>
            <path d="M 38 45 L 48 60" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5"/>
            <path d="M 62 45 L 52 60" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5"/>
        </g>
    </svg>
  );
}
