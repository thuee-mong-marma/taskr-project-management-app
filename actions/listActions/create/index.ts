'use server';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { CreateList } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, boardId } = data;

  let list;

  try {
    const board = await prismadb.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: 'Board not found',
      };
    }

    const lastList = await prismadb.list.findFirst({
      where: {
        boardId: boardId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await prismadb.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (err) {
    return {
      error: 'Failed to create list',
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const createList = createAction(CreateList, handler);
