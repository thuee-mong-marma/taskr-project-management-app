"use server";

import { createAction } from "@/lib/createAction";
import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let card;

  try {
    card = await prismadb.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        }
      },
    });

  } catch (err) {
    return {
      error: "Failed to delete card",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: {
      ...card,
      boardId: boardId,
    },
  };
};

export const deleteCard = createAction(DeleteCard, handler);
