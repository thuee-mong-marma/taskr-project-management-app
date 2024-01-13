'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary'
    | null
    | undefined;
  children?: React.ReactNode;
  size?: 'default' | 'icon' | 'sm' | 'md' | 'lg' | 'xl' | null | undefined;
}

export const FormButton = ({ variant, children, size }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={variant} disabled={pending} size={size}>
      {children}
    </Button>
  );
};
