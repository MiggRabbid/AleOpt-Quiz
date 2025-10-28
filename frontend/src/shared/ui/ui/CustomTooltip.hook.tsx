'use client';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

import { IUseTooltipProps } from './CustomTooltip.types';

export function useTooltip<T extends HTMLElement>(
  props?: IUseTooltipProps,
): {
  disableHoverListener: boolean;
  ref: MutableRefObject<T | null>;
} {
  const isCheckSize = useMemo(() => props?.isCheckSize ?? true, [props?.isCheckSize]);
  const [isOverflowing, setIsOverflowing] = useState(
    props?.isOverflowing !== undefined ? props?.isOverflowing : false,
  );
  const ref = useRef<T | null>(null);
  const dependencies = props?.dependencies;

  useEffect(() => {
    if (isCheckSize) {
      const checkOverflow = () => {
        if (
          ref &&
          'current' in ref &&
          ref.current &&
          ref.current?.scrollWidth &&
          ref.current?.clientWidth
        ) {
          const { scrollWidth, clientWidth, scrollHeight, clientHeight } = ref.current;
          setIsOverflowing(scrollWidth > clientWidth || scrollHeight > clientHeight);
        }
      };
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      return () => window.removeEventListener('resize', checkOverflow);
    }
  }, [dependencies, isCheckSize, ref]);

  return { disableHoverListener: !isOverflowing, ref: ref };
}
