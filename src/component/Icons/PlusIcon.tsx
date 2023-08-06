import { SVGAttributes } from 'react';

export function PlusIcon({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg {...props}>
      <path
        d="M6 12H18M12 6V18"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
