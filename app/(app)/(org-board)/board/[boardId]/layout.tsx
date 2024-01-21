import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { startCase } from 'lodash';
import { notFound, redirect } from 'next/navigation';
import BoardNavbar from './_components/Board/BoardNavbar';

interface BoardRootLayoutProps {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId)
    return {
      title: 'Board',
    };

  const board = await prismadb.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: startCase(board?.title || 'Board'),
  };
}

const BoardRootLayout = async ({ children, params }: BoardRootLayoutProps) => {
  console.log('params', params);
  const { orgId } = auth();

  if (!orgId) {
    return redirect('/create-org');
  }
  const board = await prismadb.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullURL})` }}
      className="relative h-full bg-no-repeat bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-black/15" />
      <main className="relative pt-28 h-full">
        <BoardNavbar boardData={board} />
        {children}
      </main>
    </div>
  );
};

export default BoardRootLayout;
