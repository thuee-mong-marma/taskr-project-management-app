'use client';

import { createBoard } from '@/actions/create-board';
import { FormSubmit } from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { useAction } from '@/hooks/useAction';
import { toast } from 'sonner';

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput
          id="title"
          label="Board Title"
          errors={fieldErrors}
          className="mt-2"
        />
      </div>
      <FormSubmit className="mt-2 bg-teal-600 hover:bg-transparent hover:text-teal-600 border border-teal-600">
        Save
      </FormSubmit>
    </form>
  );
};
