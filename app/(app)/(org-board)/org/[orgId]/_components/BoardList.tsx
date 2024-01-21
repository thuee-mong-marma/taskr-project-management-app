import BoardCreatePopover from '@/components/form/BoardCreateFormPopover';
import Hint from '@/components/ui/hint';
import { Skeleton } from '@/components/ui/skeleton';
import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { HelpCircle, User } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect('/create-org');
  }

  const boards = await prismadb.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            style={{ backgroundImage: `url(${board.imageThumbURL})` }}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-teal-300 rounded-sm h-full w-full p-2"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <BoardCreatePopover sideOffset={10} side="right">
          <div
            role="button"
            className="relative w-full h-full aspect-video bg-muted rounded-sm flex-col gap-y-1 flex items-center justify-center hover:opacity-75 transition"
          >
            <span className="text-sm">Create new board</span>
            <span className="text-xs">5 remaining</span>
            <Hint
              description={`Free workspaces can have up to 5 open boards.For unlimited boards upgrade this workspace.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </BoardCreatePopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};

export default BoardList;
