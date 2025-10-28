import type {
  TooltipProps as MuiTooltipProps,
  SxProps,
  TypographyProps,
  Theme,
} from '@mui/material';
import { ReactNode } from 'react';

export type TooltipSlotProps = MuiTooltipProps['slotProps'];
export type TooltipPlacementProps = MuiTooltipProps['placement'];

export type TooltipProps = {
  placement?: TooltipPlacementProps;
  content?: ReactNode;
  tooltipSlotSx?: TooltipSlotProps;
} & Omit<MuiTooltipProps, 'placement' | 'variant' | 'title' | 'content'>;

export interface IUseTooltipProps {
  isOverflowing?: boolean;
  isCheckSize?: boolean;
  dependencies?: unknown[] | null;
}

export interface ITooltipTypographyProps {
  tooltip?: Omit<TooltipProps, 'children'> & { sx?: SxProps<Theme> } & {
    isCheckSize?: boolean;
    isDisabled?: boolean;
    isOverflowing?: boolean;
  };
  tooltipSlotSx?: TooltipSlotProps;
  typography?: TypographyProps & { sx?: SxProps<Theme> };
  maxRows?: number;
  children: ReactNode;
}
