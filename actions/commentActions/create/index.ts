"use server";

import { createAction } from "@/lib/createAction";
import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CreateComment } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { message, cardId, boardId, userImage, userName } = data;

  let comment;

  try {
    comment = await prismadb.comment.create({
      data: {
        message,
        cardId,
        boardId,
        userId,
        userImage,
        userName,
      },
    });

    // await createAuditLog({
    //   entityId: card.id,
    //   entityTitle: card.title,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.CREATE
    // })
  } catch (err) {
    return {
      error: "Failed to create comment",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: comment,
  };
};

export const createComment = createAction(CreateComment, handler);
