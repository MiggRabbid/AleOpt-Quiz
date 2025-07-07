import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import type { SelectChangeEvent } from '@mui/material';

export interface ICustomSelectItem {
  value: string | number;
  text: string;
}

export type TCustomSelectItems = Array<ICustomSelectItem>;

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
      <InputLabel id="custom-select-label" className="w-full" color="success">
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

export default React.memo(CustomSelect);
