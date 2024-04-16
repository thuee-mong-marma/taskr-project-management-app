import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        invalid_type_error: "Description is required",
        required_error: "Description is required",
      })
      .min(3, {
        message: "Minimum 3 letters required",
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
      })
      .min(3, {
        message: "Minimum 3 letters required",
      })
  ),
  id: z.string(),
});
