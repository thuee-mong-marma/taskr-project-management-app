import { Comment } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/createAction';
import { CreateComment } from './schema';

export type InputType = z.infer<typeof CreateComment>;

export type ReturnType = ActionState<InputType, Comment>;
