"use client";

import { useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardsWithList } from "@/types/types";
import { AlignLeft } from "lucide-react";
import { useQueryClient } from "react-query";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormSubmit } from "@/components/form/FormButton";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { updateCard } from "@/actions/cardActions/update";
import { toast } from "sonner";

export interface CardDescriptionProps {
  data: CardsWithList;
}

export const CardDescription = ({ data }: CardDescriptionProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setEditing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {execute, fieldErrors} = useAction(updateCard, {
    onSuccess: (data) => {
      toast.success("Card description updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      disableEditing();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error updating card description");
    }

  });

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const disableEditing = () => setEditing(false);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;

    const boardId = params.boardId as string;

    execute({id: data.id, description, boardId});

  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2" >
            <FormTextarea
              id="description"
              className="w-full mt-2"
              placeholder="Add a more detailed description..."
              defaultValue={data.description || undefined}
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button type='button' onClick={disableEditing} size='sm' variant='ghost'>Cancel</Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            className="min-h-[78px] bg-skeleton text-sm font-medium py-3 px-3.5 rounded-md"
            onClick={enableEditing}
          >
            {data.description || "Add a detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

CardDescription.Skeleton = function CardDescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-skeleton" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-skeleton" />
        <Skeleton className="w-full h-[78px] bg-skeleton" />
      </div>
    </div>
  );
};
