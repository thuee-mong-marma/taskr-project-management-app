"use client";

import { useCardModal } from "@/hooks/useCardModal";
import { CardsWithList } from "@/types/types";
import { fetcher } from "@/lib/fetcher";
import { Dialog, DialogContent } from "../../ui/dialog";
import { ModalHeader } from "./Header";
import { useQuery } from "react-query";
import { CardDescription } from "./Description";
import CardActions from "./Actions";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardsWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  if (!cardData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <ModalHeader.Skeleton /> : <ModalHeader data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <CardDescription.Skeleton />
              ) : (
                <CardDescription data={cardData} />
              )}
            </div>
          </div>
          {!cardData ? (
            <CardActions.Skeleton />
          ) : (
            <CardActions data={cardData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
