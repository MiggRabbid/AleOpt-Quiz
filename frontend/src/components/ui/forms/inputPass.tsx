import React, { useCallback, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { iInputPassProps } from '../../../models/interfaces';
import ShowPassButton from '../buttons/ShowPassBtn';

const InputPass: React.FC<iInputPassProps> = React.memo((props) => {
  const { controlId, label, style, name, placeholder, value, onChange, isInvalid } =
    props;

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
    <FloatingLabel className="col-11 col-sm-5" controlId={controlId} label={label}>
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
      <ShowPassButton showPassword={showPassword} setShowPassword={setShowPassword} />
    </FloatingLabel>
  );
});

InputPass.displayName = 'InputPass';

export default InputPass;
