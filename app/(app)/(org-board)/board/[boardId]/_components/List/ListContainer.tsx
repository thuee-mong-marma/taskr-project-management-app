'use client';

import { ListWithCards } from '@/types';
import ListForm from './ListForm';
import ListItem from './ListItem';

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}
export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
