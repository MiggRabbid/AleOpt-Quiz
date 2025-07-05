import { Dispatch, SetStateAction } from 'react';

export type TypeCustomInput = 'text' | 'password';

export interface ICustomInputProps {
  type: TypeCustomInput;
  label?: string;
  error?: any;
  helperText?: string;
  register?: UseFormRegister<FormData>;
  disabled?: boolean;
}

export interface ICustomEndAdornmentProps {
  disabled?: boolean;
  error?: boolean;
  type: TypeCustomInput;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}
