'use client';
// Библиотеки
import { useState } from 'react';
import { TextField } from '@mui/material';
// Типизация
import { ICustomInputProps } from './types/CustomInput';
import { CustomEndAdornment } from './ui/CustomEndAdornment';

const CustomInput = (props: ICustomInputProps) => {
  const { label, type } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      type={showPassword ? 'text' : type}
      label={label || 'Введите текст'}
      fullWidth
      color="success"
      className="rounded-br-xl!"
      sx={{
        borderRadius: '50% !important',
        '.MuiInputBase-root': {
          borderRadius: '12px !important',
        },
        '.MuiOutlinedInput-notchedOutline': {
          borderRadius: '12px !important',
        },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <CustomEndAdornment
              type={type}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ),
        },
      }}
    />
  );
};

export { CustomInput };
