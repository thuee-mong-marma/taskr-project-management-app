'use server';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { CreateCard } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, boardId, listId } = data;

  let card;

  try {
    const list = await prismadb.list.findUnique({
      where: {
        id:listId,
        board: {
          orgId
        }
      }
    })

    if(!list) {
      return {
        error: "List not found"
      }
    }

    const lastCardOnTheList = await prismadb.card.findFirst({
      where: {listId},
      orderBy: {order: 'desc'},
      select: {
        order: true
      }
    })

    const newOrder = lastCardOnTheList ? lastCardOnTheList.order + 1 : 1;

    card = await prismadb.card.create({
      data: {
        title, listId, order: newOrder
      }
    })
  } catch (err) {
    return {
      error: 'Failed to create card',
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const createCard = createAction(CreateCard, handler);
