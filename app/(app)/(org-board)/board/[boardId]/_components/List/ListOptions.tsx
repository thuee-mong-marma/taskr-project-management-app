'use client';

import { copyList } from '@/actions/listActions/copy';
import { deleteList } from '@/actions/listActions/delete';
import { FormSubmit } from '@/components/form/FormButton';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/useAction';
import { List } from '@prisma/client';
import { MoreHorizontal, X } from 'lucide-react';
import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      closeRef.current?.click();
      toast.success(`List '${data.title}' deleted successfully`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      closeRef.current?.click();
      toast.success(`List '${data.title}' copied successfully`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeDelete({
      id,
      boardId,
    });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto px-2.5 py-1" variant="ghost">
          <MoreHorizontal className="icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="center">
        <div className="text-sm font-medium text-center text-neutral-600">
          List Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="icon" />
          </Button>
        </PopoverClose>
        <Button
          className="rounded-none w-full h-auto px-5 py-2 font-normal text-sm justify-start"
          variant="ghost"
          onClick={onAddCard}
        >
          Add card
        </Button>
        <form action={onCopy}>
          <input hidden name="id" value={data.id} id="id" />
          <input hidden name="boardId" value={data.boardId} id="boardId" />
          <FormSubmit
            className="rounded-none w-full h-auto px-5 py-2 font-normal text-sm justify-start"
            variant="ghost"
          >
            Copy List
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" value={data.id} id="id" />
          <input hidden name="boardId" value={data.boardId} id="boardId" />
          <FormSubmit
            className="rounded-none w-full h-auto px-5 py-2 font-normal text-sm justify-start text-red-600 hover:bg-red-600 hover:text-white"
            variant="ghost"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
