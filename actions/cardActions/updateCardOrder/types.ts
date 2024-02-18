import { List } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/createAction';
import { UpdateListOrder } from './schema';

export type InputType = z.infer<typeof UpdateListOrder>;

export type ReturnType = ActionState<InputType, List[]>;
