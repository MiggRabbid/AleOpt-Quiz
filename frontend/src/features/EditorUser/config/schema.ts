import * as z from 'zod';
import { UserGender, UserRoles } from '@/types/staff.types';

export const getUserSchema = (requiredPass: boolean) => {
  return z.object({
    firstName: z
      .string()
      .min(1, 'Имя должно быть от 1 до 20 символов')
      .max(20, 'Имя должно быть от 1 до 20 символов'),
    lastName: z
      .string()
      .min(1, 'Фамилия должна быть от 1 до 20 символов')
      .max(20, 'Фамилия должна быть от 1 до 20 символов'),
    username: z
      .string()
      .min(4, 'Логин должен быть от 4 до 20 символов')
      .max(20, 'Логин должен быть от 4 до 20 символов'),
    password: requiredPass
      ? z
          .string()
          .min(6, 'Пароль должен быть от 6 до 20 символов')
          .max(20, 'Пароль должен быть от 6 до 20 символов')
      : z
          .string()
          .max(20, 'Пароль должен быть от 6 до 20 символов')
          .optional()
          .or(z.literal('')),
    role: z.nativeEnum(UserRoles, {
      required_error: 'Выберите роль пользователя',
      invalid_type_error: 'Неверная роль',
    }),
    gender: z.nativeEnum(UserGender, {
      required_error: 'Выберите пол пользователя',
      invalid_type_error: 'Неверный пол',
    }),
    image: z.string().min(1, 'Аватар не выбран'),
  });
};

export type FormData = z.infer<ReturnType<typeof getUserSchema>>;
