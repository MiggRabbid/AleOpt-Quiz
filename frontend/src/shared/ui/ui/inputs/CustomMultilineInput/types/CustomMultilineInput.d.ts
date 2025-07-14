export interface ICustomMultilineInputProps {
  label?: string;
  error?: any;
  helperText?: string;
  register?: UseFormRegister<FormData>;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  stretchHeight?: boolean;
}
