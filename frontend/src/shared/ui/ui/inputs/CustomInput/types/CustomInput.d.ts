import { Dispatch, SetStateAction } from 'react';

export type TypeCustomInput = 'text' | 'password';

export interface ICustomInputProps {
  type: TypeCustomInput;
  label?: string;
  error?: any;
  helperText?: string;
  register?: UseFormRegister<FormData>;
}

export interface ICustomEndAdornmentProps {
  error?: boolean;
  type: TypeCustomInput;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}
