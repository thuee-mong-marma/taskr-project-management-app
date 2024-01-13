'use client';

import { createBoard } from '@/actions/boardActions';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { FormButton } from './Button';
import { FormInput } from './Input';

export const BoardForm = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBoard, initialState);
  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>
      <FormButton>Submit</FormButton>
    </form>
  );
};
