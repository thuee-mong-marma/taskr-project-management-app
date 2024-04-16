"use server";

import { createAction } from "@/lib/createAction";
import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyCard } from "./schema";
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
    const cardToCopy = await prismadb.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!cardToCopy) {
      return {
        error: "Card not found",
      };
    }

    const lastCard = await prismadb.card.findFirst({
      where: {
        listId: cardToCopy.listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await prismadb.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        listId: cardToCopy.listId,
      },
    });
  } catch (err) {
    return {
      error: "Failed to copy card",
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

export const copyCard = createAction(CopyCard, handler);
