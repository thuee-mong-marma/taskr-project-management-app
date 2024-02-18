"use client";

import { ListWithCards } from "@/types/types";
import { useEffect, useState } from "react";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/useAction";
import { updateListOrder } from "@/actions/listActions/updateListOrder";
import { toast } from "sonner";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(data: T[], startIndex: number, endIndex: number) {
  const result = Array.from(data);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const {execute: executeUpdateListOrder} = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: () => {
      toast.error("Failed to reorder list");
    }
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    //if drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //user moves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    //user moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) return;

      //check if cards exists on the source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      //check if cards exist on the destination list
      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      //moving the card in the same list(update order only)
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, idx) => (card.order = idx));

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        //TODO: trigger server actions
        //user moves card to another list
      } else {
        //firstly remove the card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        //assign the new listid to the moved card
        movedCard.listId = destination.droppableId;

        //add card to the destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => (card.order = idx));

        //update the order for each card in the destination list
        destinationList.cards.forEach((card, idx) => (card.order = idx));

        setOrderedData(newOrderedData);
        //TODO: trigger server actions
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            className="flex gap-x-3 h-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
