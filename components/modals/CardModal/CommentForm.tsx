"use client";

import { use, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormSubmit } from "@/components/form/FormButton";
import { Button } from "@/components/ui/button";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useAction } from "@/hooks/useAction";
import { createComment } from "@/actions/commentActions/create";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/useCardModal";

export const CommentForm = () => {
  const { user } = useUser();

  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isEditing, setEditing] = useState<boolean>(false);

  const params = useParams();
  const {id} = useCardModal();

  const {execute, fieldErrors} = useAction(createComment, {
    onSuccess: () => {
      toast.success("Comment added successfully");
      console.log("Comment created");
      disabledEditing()
    },
    onError: (err) => {
      toast.error(err);
      console.log("Error creating comment");
    },
  })

  console.log("comment form user", user);

  const disabledEditing = () => setEditing(false);

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disabledEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disabledEditing);

  const onSubmit = (formData: FormData) => {
    const message = formData.get("comment") as string;
    const boardId = params.boardId as string;
    const userId = user?.id as string;
    const userImage = user?.imageUrl as string;
    const userName = user?.fullName as string;
    const cardId = id as string

    execute({
      message,
      cardId,
      boardId,
      userId,
      userImage,
      userName,
    })


  };

  return (
    <div className="flex gap-x-2 my-4">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage src={user?.imageUrl} />
      </Avatar>
      <div className="w-full">
        <form action={onSubmit} ref={formRef} className="space-y-2">
          {isEditing ? (
            <div className="w-full flex flex-col space-y-2">
              <FormTextarea
                id="comment"
                className="w-full"
                placeholder="Write a comment..."
                defaultValue=""
                errors={fieldErrors}
                ref={textareaRef}
              />
              <div className="flex items-center gap-x-2">
                <FormSubmit>Save</FormSubmit>
                <Button type="button" onClick={disabledEditing} variant="ghost">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="w-full bg-skeleton rounded-md p-2 cursor-pointer hover:opacity-80"
              onClick={enableEditing}
            >
              Write a comment...
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
