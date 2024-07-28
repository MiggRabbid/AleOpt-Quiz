import React, { useCallback } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

import { iInputTextProps } from '../../../types/iInputs';

const InputText: React.FC<iInputTextProps> = React.memo((props) => {
  const { controlId, label, style, as, name, placeholder, value, onChange, isInvalid, className } =
    props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
    },
    [onChange],
  );

  return (
    <FloatingLabel className={className || 'col-11 col-sm-5'} controlId={controlId} label={label}>
      <Form.Control
        style={style}
        as={as}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={handleChange}
        isInvalid={!!isInvalid}
      />
    </FloatingLabel>
  );
});

InputText.displayName = 'InputText';

export default InputText;
