import { Board } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/createAction';

import { DeleteBoard } from './schema';

export type InputType = z.infer<typeof DeleteBoard>;

export type ReturnType = ActionState<InputType, Board>;
