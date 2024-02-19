"use client";

import { useCardModal } from "@/hooks/useCardModal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
  index: number;
  data: Card;
}

const CardItem = ({ index, data }: CardItemProps) => {
  const cardModal = useCardModal()


  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm cursor-pointer"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
