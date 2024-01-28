import { List } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/createAction';

import { UpdateList } from './schema';

export type InputType = z.infer<typeof UpdateList>;

export type ReturnType = ActionState<InputType, List>;
