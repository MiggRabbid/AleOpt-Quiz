import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';

type typeMainButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  style?: Record<string, string>;
  text: string;
  variant?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void;
};

const MainButton: React.FC<typeMainButtonProps> = React.memo((props) => {
  const { type, style, text, variant, disabled, onClick } = props;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(event);
    },
    [onClick],
  );

  if (!onClick) {
    return (
      <Button type={type} variant={variant} style={style} className="px-2 py-1 text-wrap">
        {text}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      style={style}
      className="px-2 py-1m text-wrap text-center"
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
});

MainButton.displayName = 'MainButton';

MainButton.defaultProps = {
  type: 'button',
  style: { height: '50px', width: '200px' },
  variant: 'outline-primary',
  disabled: false,
};

export default MainButton;
