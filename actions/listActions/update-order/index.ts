'use server';

import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';

import { UpdateListOrder } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { items, boardId } = data;

  let lists;

  try {
    const transaction = items.map((list) => (
      prismadb.list.update({
        where: {
          id: list.id,
          board: {
            orgId
          }
        },
        data: {
          order: list.order,
        }
      })
    ))

    lists = await prismadb.$transaction(transaction);


  } catch (err) {
    return {
      error: 'Failed to reorder',
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: lists };
};

export const updateListOrder = createAction(UpdateListOrder, handler);
