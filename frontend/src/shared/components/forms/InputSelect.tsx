import React, { useCallback } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

import { iInputSelectProps } from '../../../types/iInputs';

const InputSelect: React.FC<iInputSelectProps> = React.memo((props) => {
  const {
    controlId,
    label,
    placeholder,
    style,
    name,
    value,
    onChange,
    isInvalid,
    options,
    className,
  } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event);
    },
    [onChange],
  );

  return (
    <FloatingLabel className={className || 'col-11 col-lg-5'} controlId={controlId} label={label}>
      <Form.Select
        required
        name={name}
        aria-label={label}
        style={style}
        onChange={handleChange}
        isInvalid={isInvalid}
        value={value}
      >
        <option key="placeholder">{placeholder}</option>;
        {options &&
          Object.entries(options).map(([key, currValue]) => {
            return (
              <option key={key} value={key} selected={currValue === value}>
                {currValue}
              </option>
            );
          })}
      </Form.Select>
    </FloatingLabel>
  );
});

InputSelect.displayName = 'InputSelect';

export default InputSelect;
