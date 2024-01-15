'use server';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { CreateBoard } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: 'Auth Error: Unauthorized',
    };
  }

  const { title } = data;

  let board;

  try {
    board = await prismadb.board.create({
      data: {
        title,
      },
    });
  } catch (err) {
    return {
      error: 'Database error: Failed to create board',
    };
  }

  revalidatePath(`/board/${board.id}`);

  return {
    data: board,
  };
};

export const createBoard = createAction(CreateBoard, handler);
