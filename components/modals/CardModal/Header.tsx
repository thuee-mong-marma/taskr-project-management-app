"use client";

import { useRef, useState, ElementRef } from "react";
import { CardsWithList } from "@/types/types";
import { Layout } from "lucide-react";
import { FormInput } from "@/components/form/FormInput";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useQueryClient } from "react-query";
import { useAction } from "@/hooks/useAction";
import { updateCard } from "@/actions/cardActions/update";
import { toast } from "sonner";

interface CardModalHeaderProps {
  data: CardsWithList;
}

export const ModalHeader = ({ data }: CardModalHeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [isEditing, setEditing] = useState<boolean>(false);

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] });
      toast.success(`Card title updated to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error("Failed to update card title");
    },
  });

  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState<string>(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setEditing(false);
  };


  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === data.title) return;

    execute({
      title,
      boardId,
      id: data.id,
    });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="w-6 h-6 text-neutral-400" />
      <div className="w-full">
        {isEditing ? (
          <form action={onSubmit}>
            <FormInput
              id="title"
              ref={inputRef}
              defaultValue={title}
              onBlur={onBlur}
              className="font-semibold text-xl px-1.5 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
            />
          </form>
        ) : (
          <div
            onClick={enableEditing}
            className="w-full text-xl font-semibold"
          >
            {data.title}
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

ModalHeader.Skeleton = function ModalHeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-skeleton" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-skeleton" />
        <Skeleton className="w-24 h-4 bg-skeleton" />
      </div>
    </div>
  );
};
