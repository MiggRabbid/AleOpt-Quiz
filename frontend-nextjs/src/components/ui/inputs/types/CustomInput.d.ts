import { Dispatch, SetStateAction } from 'react';

export type TypeCustomInput = 'text' | 'password';

export interface ICustomInputProps {
  label?: string;
  type: TypeCustomInput;
}

export interface ICustomEndAdornmentProps {
  type: TypeCustomInput;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}
