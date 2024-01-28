'use client';

import { ListWithCards } from '@/types';
import { ListHeader } from './ListHeader';

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

const ListItem = ({ index, data }: ListItemProps) => {
  return (
    <div className="shrink-0 h-full w-[275px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </div>
  );
};

export default ListItem;
