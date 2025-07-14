import * as z from 'zod';

import { answersKeys } from '@/types/types.types';

export const userSchema = z.object({
  question: z.string().min(1, 'Вопрос обязателен'),
  a: z.string().min(1, 'Вопрос обязателен'),
  b: z.string().min(1, 'Вопрос обязателен'),
  c: z.string().min(1, 'Вопрос обязателен'),
  d: z.string().min(1, 'Вопрос обязателен'),
  correctAnswer: z.enum(answersKeys, {
    required_error: 'Выберите верный ответ',
    invalid_type_error: 'Ошибка выбора',
  }),
});

export type FormData = z.infer<typeof userSchema>;
