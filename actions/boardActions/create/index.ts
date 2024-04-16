'use server';

import { createAction } from '@/lib/createAction';
import { prismadb } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { CreateBoard } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Auth Error: Unauthorized',
    };
  }

  const { title, image } = data;
  const [imageId, imageUserName, imageThumbURL, imageFullURL, imageLinkHTML] =
    image.split('|');
  console.log({
    imageId,
    imageUserName,
    imageThumbURL,
    imageFullURL,
    imageLinkHTML,
  });

  if (
    !imageId ||
    !imageUserName ||
    !imageThumbURL ||
    !imageFullURL ||
    !imageLinkHTML
  ) {
    return {
      error: 'Missing fields. Failed to create board',
    };
  }

  let board;

  try {
    board = await prismadb.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbURL,
        imageFullURL,
        imageUserName,
        imageLinkHTML,
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
