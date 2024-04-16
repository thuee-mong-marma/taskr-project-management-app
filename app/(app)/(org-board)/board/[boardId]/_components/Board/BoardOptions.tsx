'use client';

import { deleteBoard } from '@/actions/boardActions/delete';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/useAction';
import { MoreHorizontal, X } from 'lucide-react';
import { toast } from 'sonner';

interface BoardOptionsProps {
  id: string;
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-3" side="bottom" align="start">
        <div className="font-medium text-center text-neutral-600 text-sm pb-5">
          Board Actions
        </div>
        <PopoverClose>
          <Button
            className="h-auto w-auto p-2 absolute top-3 right-3 text-neutral-600"
            variant="ghost"
          >
            <X className="icon" />
          </Button>
        </PopoverClose>
        <Button
          variant="destructive"
          className="w-full h-auto text-sm"
          onClick={onDelete}
          disabled={isLoading}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
