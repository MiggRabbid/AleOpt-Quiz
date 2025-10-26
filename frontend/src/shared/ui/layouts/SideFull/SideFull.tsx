import { Box } from '@mui/material';
import clsx from 'clsx';

interface ISideFullProps {
  children: React.ReactNode;
  id: string;
  type: 'login' | 'main';
  otherClass?: string;
}

const SideFull = ({ children, id, type, otherClass }: ISideFullProps) => {
  const className = clsx(
    `flex grow`,
    type === 'login' ? 'p-20 gap-20' : 'mx-6 my-4.5 gap-3.5',
    otherClass,
    {},
  );

  return (
    <Box className={className} id={id}>
      {children}
    </Box>
  );
};

export { SideFull };
