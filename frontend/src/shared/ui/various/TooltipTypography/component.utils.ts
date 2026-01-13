import type { Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system';

export const sxTextOverflow = (line: number): SystemStyleObject<Theme> =>
  line === 1
    ? {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '-webkit-fill-available',
        maxWidth: 'fit-content',
      }
    : {
        wordBreak: 'break-word',
        whiteSpace: 'normal',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: line,
        width: 'fit-content',
        overflowWrap: 'anywhere',
      };
