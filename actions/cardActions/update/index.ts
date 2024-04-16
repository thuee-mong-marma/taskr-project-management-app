'use server';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { UpdateCard } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, boardId, ...values } = data;

  let card;

  try {
    card = await prismadb.card.update({
      where: {
        id,
        list: {
          board :{
            orgId
          }
        }
      },
      data: {
        ...values
      },
    });
  } catch (err) {
    return {
      error: 'Failed to update card',
    };
  }

  revalidatePath(`/board/${id}`);

  return { data: card };
};

export const updateCard = createAction(UpdateCard, handler);
