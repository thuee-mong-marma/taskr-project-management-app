import { List } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/createAction';

import { DeleteCard } from './schema';

export type InputType = z.infer<typeof DeleteCard>;

export type ReturnType = ActionState<InputType, List>;
