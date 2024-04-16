'use client';

import { createList } from '@/actions/listActions/create';
import { FormSubmit } from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/useAction';
import { Plus, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import ListWrapper from './ListWrapper';

const ListForm = () => {
  const router = useRouter();
  const { boardId } = useParams();
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const [isEditing, setEditing] = useState<boolean>(false);

  const enableEditing = () => {
    setEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Escape') {
      disableEditing();
    }
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const boardId = formData.get('boardId') as string;

    execute({ title, boardId });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white shadow-md space-y-4"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title.."
          />
          <input type="hidden" value={boardId} name="boardId" />
          <div className="flex items-center gap-x-2">
            <FormSubmit className="w-full">Add List</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="destructive">
              <X className="icon" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
        role="button"
        onClick={enableEditing}
      >
        <Plus className="icon mr-2" />
        <span>Add a list</span>
      </button>
    </ListWrapper>
  );
};

export default ListForm;
