import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export default function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      {...props}
    >
      <path d="M6 12C6 9.79086 7.79086 8 10 8C11.6569 8 13 9.34315 13 11C13 12.6569 11.6569 14 10 14" />
      <path d="M12 11C12 8.79086 13.7909 7 16 7C17.6569 7 19 8.34315 19 10C19 11.6569 17.6569 13 16 13" />
      <path d="M4 18C4 15.7909 5.79086 14 8 14C9.65685 14 11 15.3431 11 17C11 18.6569 9.65685 20 8 20" />
    </svg>
  );
}
