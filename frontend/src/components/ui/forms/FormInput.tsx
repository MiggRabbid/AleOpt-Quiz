import InputSelect from './inputSelect';
import InputPass from './inputPass';
import InputText from './InputText';

import { iFormInputProps } from '../../../models/interfaces';

const FormInput: React.FC<iFormInputProps> = (props) => {
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
  } = props;

  const style = { height, minWidth: '150px' };

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
};

FormInput.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default FormInput;
