'use server';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { UpdateBoard } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, id } = data;

  let board;

  try {
    board = await prismadb.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch (err) {
    return {
      error: 'Failed to update board',
    };
  }

  revalidatePath(`/board/${id}`);

  return { data: board };
};

export const updateBoard = createAction(UpdateBoard, handler);
