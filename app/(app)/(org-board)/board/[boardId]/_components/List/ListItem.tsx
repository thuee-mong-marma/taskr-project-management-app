'use client';

import { ListWithCards } from '@/types/types';
import { ElementRef, useRef, useState } from 'react';
import { ListHeader } from './ListHeader';
import {CardCreateForm} from './CardCreateFrom';


interface ListItemProps {
  index: number;
  data: ListWithCards;
}

const ListItem = ({ index, data }: ListItemProps) => {

  const textAreaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setEditing] = useState<boolean>(false);

  const disableEditing = () => setEditing(false);

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus()
    },0)
  }

  return (
    <li className="shrink-0 h-full w-[275px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md">
        <ListHeader data={data} onAddCard={enableEditing}/>
        <CardCreateForm listId={data.id} ref={textAreaRef} isEditing={isEditing} enableEditing={enableEditing} disableEditing={disableEditing}/>
      </div>
    </li>
  );
};

export default ListItem;

