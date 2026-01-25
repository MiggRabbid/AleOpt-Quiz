import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export interface ICustomAccordionProps {
  SummaryChildren: ReactNode;
  DetailsChildren: ReactNode;
  ariaControls: string;
  sx?: SxProps<Theme>;
}

export interface ICustomAccordionSummaryProps {
  children: ReactNode;
  ariaControls: string;
  sx?: SxProps<Theme>;
  expanded?: boolean;
}

export interface ICustomAccordionDetailsProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}
