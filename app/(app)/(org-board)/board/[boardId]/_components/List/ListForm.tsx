'use client';

import { FormSubmit } from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import ListWrapper from './ListWrapper';

const ListForm = () => {
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

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full p-3 rounded-md bg-white shadow-md space-y-4"
        >
          <FormInput
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title.."
          />
          <input type="hidden" value={boardId} name="boardId" />
          <div className="flex items-center gap-x-2">
            <FormSubmit className="w-full">Add List</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="destructive">
              Cancel
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
        <Plus className="h-4 w-4 mr-2" />
        <span>Add a list</span>
      </button>
    </ListWrapper>
  );
};

export default ListForm;
