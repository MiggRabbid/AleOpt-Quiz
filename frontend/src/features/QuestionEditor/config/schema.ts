import * as z from 'zod';

import { answersKeys } from '@app/types';

export const schema = z.object({
  question: z.string().min(1, 'Вопрос обязателен'),
  a: z.string().min(1, 'Ответ обязателен'),
  b: z.string().min(1, 'Ответ обязателен'),
  c: z.string().min(1, 'Ответ обязателен'),
  d: z.string().min(1, 'Ответ обязателен'),
  correctAnswer: z
    .enum(answersKeys)
    .refine((val) => !!val, { message: 'Выберите верный ответ' }),
});

export type FormData = z.infer<typeof schema>;
