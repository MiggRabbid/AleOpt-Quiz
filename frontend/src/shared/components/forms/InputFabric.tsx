import React from 'react';

import InputSelect from './InputSelect';
import InputPass from './InputPass';
import InputText from './InputText';

import { iFormInputProps } from '../../../types/interfaces/iInputs';

const FormInput: React.FC<iFormInputProps> = React.memo((props) => {
  const {
    as,
    type,
    controlId,
    label,
    height,
    name,
    placeholder,
    value,
    onChange,
    isInvalid,
    options,
    className,
    isDisable,
  } = props;

  const style = { height };

  if (as === 'select') {
    return (
      <InputSelect
        className={className}
        controlId={controlId}
        label={label}
        placeholder={placeholder}
        style={style}
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
        options={options}
      />
    );
  }

  if (type === 'password') {
    return (
      <InputPass
        className={className}
        controlId={controlId}
        label={label}
        style={style}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
        isDisable={isDisable}
      />
    );
  }

  return (
    <InputText
      className={className}
      as={as}
      controlId={controlId}
      label={label}
      style={style}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid}
    />
  );
});

FormInput.defaultProps = {
  type: 'text',
};

FormInput.displayName = 'FormInput';

export default FormInput;
