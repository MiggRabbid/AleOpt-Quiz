import React, { useCallback, useState } from 'react';
import { FloatingLabel, InputGroup, Form } from 'react-bootstrap';

import ShowPassButton from '../buttons/ShowPassBtn';

import { iInputPassProps } from '../../../types/iInputs';

const InputPass: React.FC<iInputPassProps> = React.memo((props) => {
  const {
    controlId,
    label,
    style,
    name,
    placeholder,
    value,
    onChange,
    isInvalid,
    className,
    isDisable,
    error,
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const getPassInpType = (state: boolean): 'text' | 'password' => {
    return state ? 'text' : 'password';
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
    },
    [onChange],
  );

  return (
    <div className={`${className || 'col-11 col-lg-5'}`}>
      <FloatingLabel className="w-100 pe-0 d-flex flex-row" controlId={controlId} label={label}>
        <Form.Control
          className="rounded-end-0"
          style={style}
          type={getPassInpType(showPassword)}
          name={name}
          placeholder={placeholder}
          required
          value={value}
          onChange={handleChange}
          isInvalid={!!isInvalid}
          autoComplete="false"
          disabled={isDisable}
        />
        <InputGroup.Text
          id="showPassword"
          className={`rounded-start-0 p-0 border border-${!!isInvalid ? 'danger' : 'secondary-subtle'}`}
        >
          <ShowPassButton
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isInvalid={!!isInvalid}
          />
        </InputGroup.Text>

        {!!error && (
          <Form.Control.Feedback type="invalid" tooltip>
            {error}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>
    </div>
  );
});

InputPass.displayName = 'InputPass';

export default InputPass;
