import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Chip, Typography } from '@mui/material';
import { getChipColor } from '../utils/getChipColor';
import { iUserStats } from '@/types/stats';

interface IResultTableProps {
  userStats: iUserStats | null;
}

const ResultTable = (props: IResultTableProps) => {
  const { userStats } = props;

  return (
    <Table id="ResultTable">
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={2} className="px-1! py-3!">
            <Typography
              component="h4"
              className="h-fit! w-full! text-center text-xl! font-semibold!"
            >
              Твои результаты:
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className="px-1! py-3!">
            <Typography component="p" className="text-s!">
              Количество попыток
            </Typography>
          </TableCell>
          <TableCell align="right" className="px-1! py-3!">
            <Chip
              label={`${userStats?.numberAttempts ?? '-'}`}
              className="w-17! text-base! font-bold! text-neutral-100!"
              variant="filled"
              color="info"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="px-1! py-3!">
            <Typography component="p" className="text-s!">
              Средний результат
            </Typography>
          </TableCell>
          <TableCell align="right" className="px-1! py-3!">
            <Chip
              label={!!userStats?.averageResult ? `${userStats?.averageResult}%` : '-'}
              className={`w-17! text-base! font-bold! text-neutral-100! ${getChipColor(userStats?.averageResult || 100)}`}
              variant="filled"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export { ResultTable };
