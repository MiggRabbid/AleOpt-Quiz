import type { Dispatch, SetStateAction } from 'react';

export interface ICustomEndAdornmentProps<T> {
  disabled?: boolean;
  error?: boolean;
  type: T extends string ? (T extends 'password' ? T : T | 'password') : never;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}
