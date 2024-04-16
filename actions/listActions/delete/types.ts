import { List } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/createAction';

import { DeleteList } from './schema';

export type InputType = z.infer<typeof DeleteList>;

export type ReturnType = ActionState<InputType, List>;
