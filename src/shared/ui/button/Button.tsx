import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { buttonVariants } from './buttonVariants';

export type ButtonProps = ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants>;

export const Button = ({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      type={type}
      {...props}
    />
  );
};

export type ButtonLinkProps = ComponentPropsWithoutRef<'a'> &
  VariantProps<typeof buttonVariants>;

export const ButtonLink = ({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) => {
  return (
    <a
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};
