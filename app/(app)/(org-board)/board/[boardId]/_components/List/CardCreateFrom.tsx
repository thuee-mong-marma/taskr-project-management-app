"use client";

import { FormSubmit } from "@/components/form/FormButton";
import { FormTextarea } from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef, useRef, ElementRef, KeyboardEventHandler} from 'react';
import { useAction } from "@/hooks/useAction";
import { createCard } from "@/actions/cardActions/create";
import { toast } from "sonner";
import { useRouter,  useParams} from 'next/navigation';
import { useOnClickOutside, useEventListener } from "usehooks-ts";

interface CardCreateFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardCreateForm = forwardRef<HTMLTextAreaElement, CardCreateFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const router = useRouter();
    const params = useParams();

    const formRef = useRef<ElementRef<'form'>>(null)
    const {execute, fieldErrors} = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`${data.title} created successfully`);
        formRef.current?.reset()
        // router.refresh()
      },
      onError: (error) => {
        toast.error(error);
      }
    })

    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string;
      const listId = formData.get('listId') as string;
      const boardId = params.boardId as string;

      execute({
        title, listId, boardId
      })
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if(e.key == 'Escape') {
        disableEditing()
      }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener('keydown', onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if(e.key =='Enter' && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    if(isEditing) {
      return (
        <form className="p-2 space-y-4" ref={formRef} action={onSubmit}>
          <FormTextarea id="title" onKeyDown={onTextareaKeyDown} ref={ref} placeholder="Enter a title for this card" errors={fieldErrors}/>
          <input hidden id="listId" name="listId" value={listId}/>
          <div className="flex items-center justify-between">
            <FormSubmit>
              Add Card
            </FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="destructive">
              Cancel
            </Button>
          </div>
        </form>
      )
    }
    return (<div className="p-2">
      <Button variant="ghost" onClick={enableEditing} className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm">
        <Plus className="icon"/>
        Add a card
      </Button>
    </div>);
  }
);

CardCreateForm.displayName = "Card Create Form";
