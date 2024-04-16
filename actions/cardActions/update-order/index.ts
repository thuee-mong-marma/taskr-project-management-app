'use server';

import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';

import { UpdateCardOrder } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { items, boardId } = data;

  let updateCards;

  try {
    const transaction = items.map((card) => (
      prismadb.card.update({
        where: {
          id:card.id,
          list: {
            board: {
              orgId
            }
          }
        },
        data: {
          order: card.order,
          listId: card.listId,
        }
      })
    ))

    updateCards = await prismadb.$transaction(transaction);

  } catch (err) {
    return {
      error: 'Failed to reorder',
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: updateCards };
};

export const updateCardOrder = createAction(UpdateCardOrder, handler);
