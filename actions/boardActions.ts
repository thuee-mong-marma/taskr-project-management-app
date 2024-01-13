'use server';

import { prismadb } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: 'Minimum length of 3 letters is required',
  }),
});

export type State = {
  errors?: {
    title?: string;
  };
  message?: string | null;
};

export async function createBoard(prevState: State, formData: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get('title'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields',
    };
  }

  const { title } = validatedFields.data;

  try {
    await prismadb.board.create({
      data: {
        title,
      },
    });
    console.log('record added');
  } catch (err) {
    return {
      message: 'Database error, data can not be created',
    };
  }

  revalidatePath('/org/org_2aBxhFhDRUSGFQrG2W7rWLur2EP');
  redirect('/org/org_2aBxhFhDRUSGFQrG2W7rWLur2EP');
}

export async function deleteBoard(id: string) {
  await prismadb.board.delete({
    where: {
      id,
    },
  });

  console.log('deleted board');

  revalidatePath('/org/org_2aBxhFhDRUSGFQrG2W7rWLur2EP');
}
