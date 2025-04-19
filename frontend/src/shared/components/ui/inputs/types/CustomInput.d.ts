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
  type: TypeCustomInput;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}
