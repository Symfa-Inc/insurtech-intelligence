type BadgeSize = 'sm' | 'md';

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({ children, size = 'sm' }: { children: string; size?: BadgeSize }) {
  return (
    <span className={`rounded-full bg-primary/10 font-medium text-primary ${sizeStyles[size]}`}>
      {children}
    </span>
  );
}
