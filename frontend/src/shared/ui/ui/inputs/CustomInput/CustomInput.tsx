'use client';
// Библиотеки
import { memo, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
// Компоненты
import { CustomEndAdornment } from './ui/CustomEndAdornment';
// Типизация
import type { ICustomInputProps } from './types/CustomInput';

const CustomInput = (props: ICustomInputProps) => {
  const { label, type, error, helperText, register, disabled } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <TextField
        type={showPassword ? 'text' : type}
        label={label || 'Введите текст'}
        fullWidth
        color="success"
        className="rounded-xl!"
        {...register}
        error={!!error}
        disabled={disabled}
        sx={{
          borderRadius: '50% !important',
          ['.MuiInputBase-root']: {
            borderRadius: '12px !important',
            padding: '0',
          },
          ['.MuiFormLabel-root']: {
            color: 'oklch(27.9% 0.041 260.031) !important',
            ['&.Mui-focused']: {
              color: 'rgb(45, 125, 50) !important',
            },
          },
          ['.MuiOutlinedInput-root']: {
            ['.MuiOutlinedInput-notchedOutline']: {
              borderRadius: '12px !important',
              borderWidth: '2px !important',
              borderColor: 'oklch(27.9% 0.041 260.031) !important',
            },
            ['&.Mui-focused']: {
              ['.MuiOutlinedInput-notchedOutline']: {
                borderColor: 'rgb(45, 125, 50) !important',
              },
            },
          },

          ['&:hover']: {
            backgroundColor: 'oklch(76.5% 0.177 163.223 / 0.15) !important',
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <CustomEndAdornment
                disabled={disabled}
                error={!!error}
                type={type}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            ),
          },
        }}
      />
      <FormHelperText error={!!error} className="mx-3! mt-1! h-6 h-8 min-h-8 text-xs!">
        {error && helperText && helperText}
        {error && !helperText && 'Неизвестная ошибка'}
      </FormHelperText>
    </Box>
  );
};

export default memo(CustomInput);
