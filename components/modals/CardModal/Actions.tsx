"use client";

import { useParams } from "next/navigation";
import { Copy, Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useCardModal } from "@/hooks/useCardModal";
import { copyCard } from "@/actions/cardActions/copy";
import { deleteCard } from "@/actions/cardActions/delete";
import { CardsWithList } from "@/types/types";

interface CardActionsProps {
  data: CardsWithList;
}

const CardActions = ({ data }: CardActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal()

  const {execute: executeCopyCard, isLoading: isLoadingCopy} = useAction(copyCard, {
    onSuccess: (data) => {
      console.log('Card copied');
      toast.success(`Card ${data.title} copied successfully`);
      cardModal.onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error(error);
    }
  });

  const {execute: executeDeleteCard, isLoading: isLoadingDelete} = useAction(deleteCard, {
    onSuccess: (data) => {
      console.log('Card deleted');
      toast.success(`Card ${data.title} deleted successfully`);
      cardModal.onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error(error);
    }
  })

  const onCopy = () => {
    const boardId = params.boardId as string;
    executeCopyCard({id: data.id, boardId});
  }

  const onDelete = () => {
    const boardId = params.boardId as string;
    executeDeleteCard({id: data.id, boardId});
  }

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <div className="flex md:flex-col justify-start gap-3">
        <Button variant="gray" size="inline" onClick={onCopy} disabled={isLoadingCopy}>
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button variant='gray' size='inline' onClick={onDelete} disabled={isLoadingDelete}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

CardActions.Skeleton = function CardActionsSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-20 h-4 bg-skeleton" />
      <Skeleton className="w-full h-8 bg-skeleton" />
      <Skeleton className="w-full h-8 bg-skeleton" />
    </div>
  );
};

export default CardActions;
