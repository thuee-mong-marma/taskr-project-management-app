import { deleteBoard } from '@/actions/boardActions';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { FormButton } from './Form/Button';

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
      <FormButton variant="destructive" size="sm">
        <Trash className="h-4 w-4" />
      </FormButton>
    </form>
  );
};

export default Board;
