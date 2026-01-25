// Библиотеки
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// Компоненты
import { CustomIcon } from '@/shared/ui/other/CustomIcon';
import type { MouseEvent } from 'react';

type TBtnColor =
  | 'success'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'warning';

type TBtnSize = 'small' | 'medium' | 'large';

interface IBtnGroupEditProps {
  // eslint-disable-next-line no-unused-vars
  onClickEdit: (e: MouseEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onClickDelete: (e: MouseEvent) => void;
  colorEdit?: TBtnColor;
  colorDelete?: TBtnColor;
  size?: TBtnSize;
  withoutMargin?: boolean;
  col?: boolean;
  disabled?: boolean;
}

const BtnGroupEdit = (props: IBtnGroupEditProps) => {
  const {
    onClickEdit,
    onClickDelete,
    colorEdit,
    colorDelete,
    size,
    withoutMargin,
    col,
    disabled,
  } = props;
  return (
    <Box
      className={`flex h-fit w-fit items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 ${withoutMargin ? 'me-0' : 'me-3'} ${col ? 'flex-col' : 'flex-row'}`}
    >
      <IconButton
        color={colorEdit}
        size={size}
        onClick={onClickEdit}
        id="btn-group-edit-edit"
        className="h-6 min-h-6 w-6 min-w-6 p-0! hover:scale-105 hover:opacity-80"
        disabled={disabled}
      >
        <CustomIcon name="EditSquare" />
      </IconButton>
      <IconButton
        color={colorDelete}
        size={size}
        onClick={onClickDelete}
        id="btn-group-edit-delete"
        className="h-6 min-h-6 w-6 min-w-6 p-0! hover:scale-105 hover:opacity-80"
        disabled={disabled}
      >
        <CustomIcon name="DeleteSweep" />
      </IconButton>
    </Box>
  );
};

export { BtnGroupEdit };
