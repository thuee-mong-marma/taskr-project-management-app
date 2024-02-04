"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { forwardRef } from "react";

interface CardCreateFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardCreateForm = forwardRef<HTMLTextAreaElement, CardCreateFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    return (<div className="p-2">
      <Button variant="ghost" onClick={enableEditing} className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm">
        <Plus className="icon"/>
        Add a card
      </Button>
    </div>);
  }
);

CardCreateForm.displayName = "Card Create Form";
