import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-background hover:bg-primary-hover',
  secondary: 'border border-border text-foreground hover:border-primary hover:text-primary',
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-medium transition-colors';

type ButtonProps = ComponentPropsWithoutRef<'a'> & {
  variant?: ButtonVariant;
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <a className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props} />;
}
