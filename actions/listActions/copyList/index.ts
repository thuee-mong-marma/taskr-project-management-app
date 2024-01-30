'use server';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { CopyList } from './schema';
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
    const listToCopy = await prismadb.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy)
      return {
        error: `No list found with ${id}`,
      };

    const lastList = await prismadb.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await prismadb.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map(({ title, description, order }) => ({
              title: title,
              description: description,
              order: order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });
  } catch (err) {
    return {
      error: 'Failed to copy list',
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const copyList = createAction(CopyList, handler);
