'use client';

import { updateBoard } from '@/actions/boardActions/update';
import { FormInput } from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/useAction';
import { Board } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';

interface BoardTitleFormProps {
  data: Board;
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(data.title);
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${title}" updated successfully!`);
      setTitle(data.title);
      setEditing(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    console.log('submitted', title);

    execute({
      title,
      id: data.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        className="flex items-center gap-x-2"
        ref={formRef}
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-1 border-none"
        />
      </form>
    );
  }

  return (
    <Button
      className="font-bold textlg h-auto w-auto py-1 px-2"
      variant="transparent"
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
};

export default BoardTitleForm;
