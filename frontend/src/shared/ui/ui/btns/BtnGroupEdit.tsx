import { Box, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';

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
}

const BtnGroupEdit = (props: IBtnGroupEditProps) => {
  const { onClickEdit, onClickDelete, colorEdit, colorDelete, size } = props;
  return (
    <Box className="me-3 flex w-fit items-center gap-2">
      <IconButton
        color={colorEdit}
        size={size}
        onClick={onClickEdit}
        id="btn-group-edit__edit"
        className="p-0!"
      >
        <EditSquareIcon />
      </IconButton>
      <IconButton
        color={colorDelete}
        size={size}
        onClick={onClickDelete}
        id="btn-group-edit__delete"
        className="p-0!"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export { BtnGroupEdit };
