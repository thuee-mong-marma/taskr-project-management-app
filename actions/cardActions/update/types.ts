import { Card } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/createAction';

import { UpdateCard } from './schema';

export type InputType = z.infer<typeof UpdateCard>;

export type ReturnType = ActionState<InputType, Card>;
