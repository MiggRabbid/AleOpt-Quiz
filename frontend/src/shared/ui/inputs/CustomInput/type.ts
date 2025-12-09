import type { UseFormRegisterReturn } from 'react-hook-form';

export type TypeCustomInput = 'text' | 'password';

export interface ICustomInputProps {
  type: TypeCustomInput;
  label?: string;
  error?: any;
  helperText?: string;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
}
