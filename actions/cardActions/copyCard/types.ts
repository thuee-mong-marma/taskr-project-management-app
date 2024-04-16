import { List } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/createAction';

import { CopyCard } from './schema';

export type InputType = z.infer<typeof CopyCard>;

export type ReturnType = ActionState<InputType, List>;
