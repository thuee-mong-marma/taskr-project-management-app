'use client'

import { Dialog, DialogContent } from "../ui/dialog"
import { useCardModal } from "@/hooks/useCardModal"
import { CardsWithList } from "@/types/types"
import { useQuery } from "react-query"
import { fetcher } from "@/lib/fetcher"

export const CardModal = () => {
  const id = useCardModal((state) => state.id)
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  const {data: cardData} = useQuery<CardsWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  })


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <h1>{cardData?.title}</h1>
      </DialogContent>
    </Dialog>
  )
}