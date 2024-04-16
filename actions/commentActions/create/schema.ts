import { z } from 'zod';

export const CreateComment = z.object({
  message: z
    .string({
      required_error: 'Comment is required',
      invalid_type_error: 'Comment is required',
    })
    .min(3, {
      message: 'Comment is too short',
    }),
  cardId: z.string(),
  boardId: z.string(),
  userId: z.string(),
  userImage: z.string(),
  userName: z.string(),
});
