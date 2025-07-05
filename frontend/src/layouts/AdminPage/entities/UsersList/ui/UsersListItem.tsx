import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';

import { UserStats } from '@/entities/UserStats';
import { PlugForEmptyData } from '@/shared/ui/ui/other/PlugForEmptyData';

import { iUser } from '@/types/staff.types';

interface IUsersListItemProps {
  user: iUser;
  index: number;
}

const UsersListItem = ({ user, index }: IUsersListItemProps) => {
  const usersStats = useAppSelector(getQuizStateField('results'));
  const currStats = usersStats?.find((stat) => stat.username === user.username);

  return (
    <Accordion className="rounded-md! border-2! border-green-200! bg-green-50!">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`UsersListItem-${user}`}
        id={`UsersListItem-${user}`}
        className="w-full! bg-green-100!"
      >
        <Typography className="me-2! flex h-6! w-6! items-center justify-center rounded-full! bg-green-300! text-xs! leading-none! font-bold! text-slate-800!">
          {index}
        </Typography>
        <Typography component="span">{user.firstName + ' ' + user.lastName}</Typography>
      </AccordionSummary>
      <AccordionDetails className="w-full!">
        {!!currStats ? <UserStats userStats={currStats} /> : <PlugForEmptyData />}
      </AccordionDetails>
    </Accordion>
  );
};

export { UsersListItem };
