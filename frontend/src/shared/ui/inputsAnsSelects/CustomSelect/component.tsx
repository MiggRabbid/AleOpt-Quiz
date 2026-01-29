import { memo } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import type { SelectChangeEvent } from '@mui/material';
import type { TCustomSelectItems } from './';

interface ICustomSelectProps {
  label: string;
  value: string | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: SelectChangeEvent) => void;
  items: TCustomSelectItems;
  error?: any;
}

const CustomSelect = (props: ICustomSelectProps) => {
  const { label, value, onChange, items, error } = props;

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel
        id="custom-select-label"
        className="w-fit"
        // color="success"
        sx={{
          fontWeight: '500',
          color: error
            ? 'rgb(199, 0, 54) !important'
            : 'oklch(27.9% 0.041 260.031) !important',
          ['&.Mui-focused']: {
            color: 'rgb(45, 125, 50) !important',
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="custom-select-label"
        id="custom-select"
        value={value}
        label={label}
        onChange={onChange}
        className="w-full rounded-xl!"
        color="success"
        sx={{
          borderRadius: '50% !important',
          ['.MuiInputBase-root']: {
            borderRadius: '12px !important',
            padding: '0',
          },

          ['.MuiOutlinedInput-notchedOutline']: {
            borderRadius: '12px !important',
            borderWidth: '2px !important',
            borderColor: error
              ? 'rgb(199, 0, 54) !important'
              : 'oklch(27.9% 0.041 260.031) !important',
          },
          ['&.Mui-focused']: {
            ['.MuiOutlinedInput-notchedOutline']: {
              borderColor: 'rgb(45, 125, 50) !important',
            },
          },

          ['&:hover']: {
            backgroundColor: 'oklch(76.5% 0.177 163.223 / 0.15) !important',
          },
        }}
      >
        {items.map((item, index: number) => (
          <MenuItem key={`custom-select-item-key${index}`} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const CustomSelectMemo = memo(CustomSelect);

export { CustomSelectMemo as CustomSelect };
