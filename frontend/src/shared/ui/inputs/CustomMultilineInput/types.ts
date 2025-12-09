import type { UseFormRegisterReturn } from 'react-hook-form';

export interface ICustomMultilineInputProps {
  label?: string;
  error?: any;
  helperText?: string;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  stretchHeight?: boolean;
}
