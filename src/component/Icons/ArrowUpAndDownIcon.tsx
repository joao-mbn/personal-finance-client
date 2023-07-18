import { SVGAttributes } from 'react';

export function ArrowUpAndDownIcon({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg {...props}>
      <path
        d="M6 3L6 21M6 3L10 7M6 3L2 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M18 21L18 3M18 21L22 17M18 21L14 17"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
