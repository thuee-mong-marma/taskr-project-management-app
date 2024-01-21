'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { FormError } from './FormError';

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue,
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="sapce-y-2">
        <div className="sapce-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            name={id}
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            ref={ref}
            onBlur={onBlur}
            disabled={disabled || pending}
            className={cn('text-sm px-2 py-1 h-7', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormError id={id} error={errors} />
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
