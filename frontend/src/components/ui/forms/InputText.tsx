import React, { useCallback } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { iInputTextProps } from '../../../models/interfaces';

const InputText: React.FC<iInputTextProps> = React.memo((props) => {
  const {
    controlId,
    label,
    style,
    as,
    name,
    placeholder,
    value,
    onChange,
    isInvalid,
    className,
  } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
    },
    [onChange],
  );

  return (
    <FloatingLabel
      className={className || 'col-11 col-sm-5'}
      controlId={controlId}
      label={label}
    >
      <Form.Control
        style={style}
        as={as}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={handleChange}
        isInvalid={isInvalid}
      />
    </FloatingLabel>
  );
});

InputText.displayName = 'InputText';

export default InputText;
