'use server';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { DeleteList } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, boardId } = data;

  let list;

  try {
    list = await prismadb.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (err) {
    return {
      error: 'Failed to delete list',
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const deleteList = createAction(DeleteList, handler);
