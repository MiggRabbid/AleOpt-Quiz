'use client';
// Библиотеки
import React, { useState } from 'react';
import { Box, TextField, FormHelperText } from '@mui/material';
// Компоненты
import { CustomEndAdornment } from './ui/CustomEndAdornment';
// Типизация
import { ICustomInputProps } from './types/CustomInput';

const CustomInput = (props: ICustomInputProps) => {
  const { label, type, error, helperText, register } = props;

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
        sx={{
          borderRadius: '50% !important',
          '.MuiInputBase-root': {
            borderRadius: '12px !important',
            padding: '0',
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: '12px !important',
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <CustomEndAdornment
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

export default React.memo(CustomInput);
