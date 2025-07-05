import * as z from 'zod';
import { UserRoles } from '@/types/staff.types';

export const getUserSchema = (isNewUser: boolean) => {
  return z.object({
    firstname: z
      .string()
      .min(1, 'Имя должно быть от 1 до 20 символов')
      .max(20, 'Имя должно быть от 1 до 20 символов'),
    lastname: z
      .string()
      .min(1, 'Фамилия должна быть от 1 до 20 символов')
      .max(20, 'Фамилия должна быть от 1 до 20 символов'),
    username: z
      .string()
      .min(6, 'Логин должен быть от 6 до 20 символов')
      .max(20, 'Логин должен быть от 6 до 20 символов'),
    password: isNewUser
      ? z
          .string()
          .min(6, 'Пароль должен быть от 6 до 20 символов')
          .max(20, 'Пароль должен быть от 6 до 20 символов')
      : z
          .string()
          .max(20, 'Пароль должен быть от 6 до 20 символов')
          .optional()
          .or(z.literal('')),
    userRole: z.nativeEnum(UserRoles, {
      required_error: 'Выберите роль пользователя',
      invalid_type_error: 'Неверная роль',
    }),
  });
};

export type FormData = z.infer<ReturnType<typeof getUserSchema>>;
