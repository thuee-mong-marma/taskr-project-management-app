import { prismadb } from '@/lib/db';
import Board from './_components/Board';
import { BoardForm } from './_components/Form';

const OrganizationPage = async () => {
  const boards = await prismadb.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <BoardForm />
      <div className="space-y-2">
        {boards.map(({ title, id }) => {
          return <Board key={id} title={title} id={id} />;
        })}
      </div>
    </div>
  );
};

export default OrganizationPage;
