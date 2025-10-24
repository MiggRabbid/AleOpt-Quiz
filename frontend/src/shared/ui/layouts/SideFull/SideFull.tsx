import { Box } from '@mui/material';
import clsx from 'clsx';

interface ISideFullProps {
  children: React.ReactNode;
  id?: string;
  mx?: TypeSpacingMapKey;
  my?: TypeSpacingMapKey;
  gap?: TypeSpacingMapKey;
  otherClass?: string;
}

const SideFull = ({ children, mx, my, gap, id, otherClass }: ISideFullProps) => {
  const className = clsx(
    `flex grow`,
    `mx-${mx ? spacingMap[mx as TypeSpacingMapKey] : spacingMap[6]}`,
    `my-${my ? spacingMap[my as TypeSpacingMapKey] : spacingMap[6]}`,
    `gap-${gap ? spacingMap[gap as TypeSpacingMapKey] : spacingMap[3.5]}`,
    otherClass,
  );

  return (
    <Box className={className} id={id}>
      {children}
    </Box>
  );
};

export { SideFull };

const spacingMap = {
  0: '0',
  1: '1',
  1.5: '1.5',
  2: '2',
  2.5: '2.5',
  3: '3',
  3.5: '3.5',
  4: '4',
  4.5: '4.5',
  5: '5',
  5.5: '5.5',
  6: '6',
  6.5: '6.5',
  7: '7',
  7.5: '7.5',
  8: '8',
  8.5: '8.5',
  9: '9',
  9.5: '9.5',
  10: '10',
  12: '12',
  16: '16',
  20: '20',
};

export type TypeSpacingMapValue = (typeof spacingMap)[TypeSpacingMapKey];
export type TypeSpacingMapKey = keyof typeof spacingMap;
