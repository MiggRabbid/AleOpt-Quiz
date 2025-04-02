import * as z from 'zod';
const schema = z.object({
  username: z
    .string()
    .min(4, 'Логин должен быть от 6 до 20 символов')
    .max(20, 'Логин должен быть от 6 до 20 символов'),
  password: z
    .string()
    .min(6, 'Пароль должен быть от 6 до 20 символов')
    .max(20, 'Пароль должен быть от 6 до 20 символов'),
});

type FormData = z.infer<typeof schema>;

export { schema, type FormData };
