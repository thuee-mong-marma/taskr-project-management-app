'use server';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { DeleteBoard } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id } = data;

  let board;

  try {
    board = await prismadb.board.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (err) {
    return {
      error: 'Failed to delete board',
    };
  }

  revalidatePath(`/org/${orgId}`);

  redirect(`/org/${orgId}`);
};

export const deleteBoard = createAction(DeleteBoard, handler);
