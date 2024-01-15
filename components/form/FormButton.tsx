'use client';

import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | 'link'
    | 'default'
    | 'primary'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost';
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
