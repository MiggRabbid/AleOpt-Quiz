// Библиотеки
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
// Типизация
import type { ICustomMultilineInputProps } from './types';
import { memo } from 'react';

const CustomMultilineInput = (props: ICustomMultilineInputProps) => {
  const { label, error, helperText, register, disabled, rows, multiline, stretchHeight } =
    props;

  const inputSx = stretchHeight
    ? {
        '& textarea': {
          resize: 'vertical',
          overflow: 'auto',
          height: '100%',
        },
      }
    : undefined;

  return (
    <Box className="h-full">
      <TextField
        label={label || 'Введите текст'}
        fullWidth
        rows={rows}
        multiline={multiline}
        color="success"
        className="rounded-xl!"
        {...register}
        error={!!error}
        disabled={disabled}
        sx={{
          borderRadius: '50% !important',
          '.MuiInputBase-root': {
            borderRadius: '12px !important',
            padding: '15px',
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: '12px !important',
          },
        }}
        inputProps={{
          input: { sx: { ...inputSx } },
        }}
      />
      <FormHelperText
        // error={!!error}
        error={true}
        className="mx-3! mt-1! mb-2! h-fit min-h-4 text-xs!"
      >
        {error && helperText && helperText}
        {error && !helperText && 'Неизвестная ошибка'}
      </FormHelperText>
    </Box>
  );
};

export default memo(CustomMultilineInput);
