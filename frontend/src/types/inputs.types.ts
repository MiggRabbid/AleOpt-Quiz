export interface iFormInputProps {
  controlId: string;
  label: string;
  height: string;
  as: 'input' | 'textarea' | 'select';
  type?: 'text' | 'password';
  name: string;
  placeholder?: string | undefined;
  value: string;
  onChange: (
    // eslint-disable-next-line no-unused-vars
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  isInvalid: boolean;
  options?: Record<string, string>;
  className?: string;
  isDisable?: boolean;
  error: any;
}

export interface iInputTextProps
  extends Omit<iFormInputProps, 'height' | 'type' | 'options' | 'defaultValue'> {
  style: Record<string, string>;
}

export interface iInputPassProps
  extends Omit<iFormInputProps, 'height' | 'as' | 'type' | 'options' | 'defaultValue'> {
  style: Record<string, string>;
}

export interface iInputSelectProps
  extends Omit<iFormInputProps, 'height' | 'as' | 'type' | 'error'> {
  style: Record<string, string>;
}
