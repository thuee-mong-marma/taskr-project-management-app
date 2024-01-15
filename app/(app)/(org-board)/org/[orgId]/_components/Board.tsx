import { deleteBoard } from '@/actions/boardActions';
import { FormSubmit } from '@/components/form/FormButton';
import { Trash } from 'lucide-react';

interface BoardProps {
  title: string;
  id: string;
}

const Board = ({ title, id }: BoardProps) => {
  const deleteBoardWithID = deleteBoard.bind(null, id);
  // const { pending } = useFormStatus();

  return (
    <form action={deleteBoardWithID} className="flex items-center gap-x-2">
      <p>Board: {title}</p>
      <FormSubmit variant="destructive">
        <Trash className="h-4 w-4" />
      </FormSubmit>
    </form>
  );
};

export default Board;
