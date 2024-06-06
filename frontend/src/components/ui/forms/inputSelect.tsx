import React, { useCallback } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { iInputSelectProps } from '../../../models/interfaces';

const InputSelect: React.FC<iInputSelectProps> = React.memo((props) => {
  const {
    controlId,
    label,
    style,
    name,
    placeholder,
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
    <FloatingLabel
      className={className || 'col-11 col-sm-5'}
      controlId={controlId}
      label={label}
    >
      <Form.Select
        required
        name={name}
        aria-label={placeholder}
        style={style}
        onChange={handleChange}
        isInvalid={isInvalid}
        value={value}
      >
        {options &&
          Object.entries(options).map(([key, currValue]) => {
            return (
              <option key={key} value={key}>
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