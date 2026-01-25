// Библиотеки
import { memo, useState } from 'react';
import clsx from 'clsx';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
// Компоненты
import { CustomCardWrapper } from '@/shared/ui';
// Типизация
import type { FC } from 'react';
import type {
  ICustomAccordionDetailsProps,
  ICustomAccordionProps,
  ICustomAccordionSummaryProps,
} from './';

const CustomAccordion: FC<ICustomAccordionProps> = memo(
  ({ SummaryChildren, DetailsChildren, sx, ariaControls }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded);
    };

    return (
      <CustomCardWrapper
        roundedSize="rounded-xl"
        shadowSize="shadow-lg"
        shadowBaseSize={expanded ? 'shadow-lg' : 'shadow-none'}
      >
        <Accordion
          expanded={expanded}
          onChange={handleChange}
          className="rounded-xl! bg-white! shadow-none!"
          sx={{
            '&:before': { display: 'none !important' },
            ...sx,
          }}
        >
          <CustomAccordionSummary
            children={SummaryChildren}
            ariaControls={ariaControls}
            expanded={expanded}
          />
          <CustomAccordionDetails children={DetailsChildren} />
        </Accordion>
      </CustomCardWrapper>
    );
  },
);
export { CustomAccordion };

const CustomAccordionSummary: FC<ICustomAccordionSummaryProps> = memo(
  ({ children, sx, ariaControls, expanded }) => {
    const className = clsx(
      'h-fit! min-h-16! w-full! rounded-xl!',
      expanded ? 'bg-slate-100!' : 'bg-white!',
    );
    return (
      <AccordionSummary
        sx={{ ...sx }}
        expandIcon={<ExpandMoreRoundedIcon />}
        aria-controls={ariaControls}
        id={ariaControls}
        className={className}
      >
        {children}
      </AccordionSummary>
    );
  },
);
export { CustomAccordionSummary };

const CustomAccordionDetails: FC<ICustomAccordionDetailsProps> = memo(
  ({ children, sx }) => {
    return (
      <AccordionDetails sx={{ ...sx }} className="h-fit! w-full! p-4!">
        {children}
      </AccordionDetails>
    );
  },
);
export { CustomAccordionDetails };
