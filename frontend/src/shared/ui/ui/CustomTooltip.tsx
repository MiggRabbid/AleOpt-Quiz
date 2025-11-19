'use client';
import { useState, useEffect } from 'react';
import MUITooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import Stack from '@mui/system/Stack';
import { SystemStyleObject } from '@mui/system';

import { sxTextOverflow } from './CustomTooltip.utils';
import { useTooltip } from './CustomTooltip.hook';

import { ITooltipTypographyProps, TooltipProps } from './CustomTooltip.types';

export const Tooltip = ({ tooltipSlotSx, ...props }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.disableHoverListener) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [props.disableHoverListener]);

  if (!props.content) return props.children;
  const { placement, content, ...muiProps } = props;

  return (
    <MUITooltip
      disableInteractive={false}
      leaveDelay={200}
      title={<Stack sx={{ overflowY: 'auto', flex: 1 }}>{content}</Stack>}
      arrow
      placement={placement}
      slotProps={{
        arrow: {
          sx: {
            color: 'white',
            ...((tooltipSlotSx?.arrow as any)?.sx ?? {}),
          },
        },
        tooltip: {
          sx: {
            width: '500px !important',
            color: 'oklch(27.9% 0.041 260.031)',
            background: 'white',
            fontSize: '16px',
            boxShadow: 'var(--shadow-block)',
            borderRadius: '8px',
            paddingX: '12px',
            paddingY: '8px',
            ...((tooltipSlotSx?.tooltip as any)?.sx ?? {}),
          },
        },
        popper: {
          sx: {
            ...((tooltipSlotSx?.popper as any)?.sx ?? {}),
          },
        },
      }}
      {...muiProps}
      open={!props.disableHoverListener && open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      {props.children}
    </MUITooltip>
  );
};

export const TooltipTypography = (props: ITooltipTypographyProps) => {
  const { isCheckSize, isDisabled, isOverflowing, ...rest } = props.tooltip ?? {};
  const { disableHoverListener, ref } = useTooltip<HTMLSpanElement>({
    isOverflowing: isOverflowing,
    isCheckSize: isDisabled ? false : (isCheckSize ?? true),
    dependencies: [props.children, props.tooltip?.content],
  });
  return (
    <Tooltip
      {...rest}
      disableHoverListener={disableHoverListener}
      content={isDisabled ? undefined : (props.tooltip?.content ?? props.children)}
      tooltipSlotSx={props.tooltipSlotSx}
    >
      <Typography
        {...props.typography}
        ref={ref}
        sx={() =>
          ({
            ...sxTextOverflow(props.maxRows ?? 1),
          }) as SystemStyleObject<Theme>
        }
      >
        {props.children}
      </Typography>
    </Tooltip>
  );
};
