import { Board } from '@prisma/client';
import BoardOptions from './BoardOptions';
import BoardTitleForm from './BoardTitleForm';

interface BoardNavbarProps {
  boardData: Board;
}

const BoardNavbar = ({ boardData }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-4 gap-x-4 text-white">
      <BoardTitleForm data={boardData} />
      <div className="ml-auto">
        <BoardOptions id={boardData.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
