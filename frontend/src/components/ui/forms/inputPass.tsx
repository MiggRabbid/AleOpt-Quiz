import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import EyeWithoutSlash from '../icons/EyeWithoutSlash';
import EyeWithSlash from '../icons/EyeWithSlash';

import { iInputPassProps } from '../../../models/interfaces';

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
    <FloatingLabel
      className="col-11 col-sm-5"
      controlId={controlId}
      label={label}
    >
      <Form.Control
        style={style}
        type={getPassInpType(showPassword)}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={handleChange}
        isInvalid={isInvalid}
        autoComplete="false"
      />
      <Button
        size="sm"
        variant="outline-secondary"
        className="position-absolute me-2 translate-middle-y top-50 end-0"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeWithSlash /> : <EyeWithoutSlash />}
      </Button>
    </FloatingLabel>
  );
});

InputPass.displayName = 'InputPass';

export default InputPass;
