import React, { useCallback, useEffect } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

import { iInputSelectProps } from '../../../types/interfaces/iInputs';

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

  useEffect(() => {
    console.log('placeholder -', placeholder);
  }, [placeholder]);

  useEffect(() => {
    console.log('value -', value);
  }, [value]);

  return (
    <FloatingLabel
      className={className || 'col-11 col-sm-5'}
      controlId={controlId}
      label={label}
    >
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
