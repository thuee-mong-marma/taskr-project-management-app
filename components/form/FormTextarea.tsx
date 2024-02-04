"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { FormError } from "./FormError";
import { useFormStatus } from "react-dom";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      onClick,
      onBlur,
      onKeyDown,
      defaultValue,
      className,
      errors,
    },
    ref
  ) => {
    const {pending} = useFormStatus();
    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
        </div>
        <Textarea
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          onClick={onClick}
          ref={ref}
          required={required}
          name={id}
          disabled={disabled|| pending}
          className={cn(
            "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
            className
          )}
          aria-describedby={`${id}-error`}
          defaultValue={defaultValue}
        />
        <FormError id={id} error={errors} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
