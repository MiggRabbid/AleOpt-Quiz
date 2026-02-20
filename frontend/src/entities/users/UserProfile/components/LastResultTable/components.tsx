import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import type { iResultEntry } from '@app/types';
import { CustomAppChip } from '@/shared/ui';

interface ILastResultTableProps {
  attempts: iResultEntry[] | null;
}

const LastResultTable = (props: ILastResultTableProps) => {
  const { attempts } = props;

  return (
    <Table className="mt-4" id="LastResultTable">
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={2} className="px-1! py-3!">
            <Typography
              component="h4"
              className="h-fit! w-full! text-center text-xl! font-semibold!"
            >
              Последние попытки:
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className="px-1! py-3!">
            <Typography component="p" className="text-s! font-bold!">
              Дата
            </Typography>
          </TableCell>
          <TableCell align="right" className="px-1! py-3!">
            <Typography component="p" className="text-s! font-bold!">
              Результат
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {attempts &&
          attempts.map((attempt: iResultEntry, index: number) => {
            if (index > 2) return null;

            const numberAttempts = Math.floor(
              (attempt.correctAnswers / attempt.answers.length) * 100,
            );

            return (
              <TableRow key={`attempt-${index}-${attempt.correctAnswers}`}>
                <TableCell className="px-1! py-3!">
                  <Typography component="p" className="text-base!">
                    {attempt.data}
                  </Typography>
                </TableCell>
                <TableCell align="right" className="px-1! py-3!">
                  <CustomAppChip result={numberAttempts} />
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export { LastResultTable };
