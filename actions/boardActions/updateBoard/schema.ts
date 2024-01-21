import { z } from 'zod';

export const UpdateBoard = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, {
      message: 'Minimum 3 letters required',
    }),
  id: z.string(),
});
