// Библиотеки
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// Компоненты
import { CustomIcon } from '@/shared/ui/various/CustomIcon';

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
  onClickEdit: (e: React.MouseEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onClickDelete: (e: React.MouseEvent) => void;
  colorEdit?: TBtnColor;
  colorDelete?: TBtnColor;
  size?: TBtnSize;
  withoutMargin?: boolean;
  col?: boolean;
}

const BtnGroupEdit = (props: IBtnGroupEditProps) => {
  const { onClickEdit, onClickDelete, colorEdit, colorDelete, size, withoutMargin, col } =
    props;
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
      >
        <CustomIcon name="EditSquare" />
      </IconButton>
      <IconButton
        color={colorDelete}
        size={size}
        onClick={onClickDelete}
        id="btn-group-edit-delete"
        className="h-6 min-h-6 w-6 min-w-6 p-0! hover:scale-105 hover:opacity-80"
      >
        <CustomIcon name="DeleteSweep" />
      </IconButton>
    </Box>
  );
};

export { BtnGroupEdit };
