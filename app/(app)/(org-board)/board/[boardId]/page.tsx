import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ListContainer } from './_components/List/ListContainer';

interface BoardRootPageProps {
  params: {
    boardId: string;
  };
}

const BoardRootPage = async ({ params }: BoardRootPageProps) => {
  const { orgId } = auth();
  const { boardId } = params;

  if (!orgId) redirect('/create-org');

  const lists = await prismadb.list.findMany({
    where: {
      boardId: boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  });

  if (!lists) {
  }

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={boardId} data={lists} />
    </div>
  );
};

export default BoardRootPage;
