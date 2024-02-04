"use client";

import { ListWithCards } from "@/types/types";
import { ElementRef, useRef, useState } from "react";
import { ListHeader } from "./ListHeader";
import { CardCreateForm } from "./CardCreateFrom";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";
import { Draggable, Droppable } from "@hello-pangea/dnd";

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
      textAreaRef.current?.focus();
    }, 0);
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          className="shrink-0 h-full w-[275px] select-none"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader data={data} onAddCard={enableEditing} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length ? "mt-2" : "mt-0"
                  )}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {data.cards.map((card, index) => (
                    <CardItem index={index} key={card.id} data={card} />
                  ))}
                </ol>
              )}
            </Droppable>
            <CardCreateForm
              listId={data.id}
              ref={textAreaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
