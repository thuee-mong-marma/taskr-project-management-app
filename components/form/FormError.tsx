import { cn } from '@/lib/utils';
import { XCircleIcon } from 'lucide-react';

interface FormErrorProps {
  id: string;
  error?: Record<string, string[] | undefined>;
  className?: string;
}

export const FormError = ({ id, error, className }: FormErrorProps) => {
  if (!error) return null;

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className={cn('mt-2 text-xs text-rose-500', className)}
    >
      {error?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex items-center p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
        >
          <XCircleIcon className="icon mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
};
