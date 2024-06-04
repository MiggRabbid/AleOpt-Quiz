import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

interface FormInputProps {
  controlId: string;
  label: string;
  height: string;
  inputType: 'input' | 'textarea' | 'select';
  name: string;
  placeholder: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  isInvalid: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  controlId,
  label,
  height,
  inputType,
  name,
  placeholder,
  value,
  onChange,
  isInvalid = false,
}) => {
  return (
    <FloatingLabel
      className="col-11 col-sm-5"
      controlId={controlId}
      label={label}
    >
      <Form.Control
        style={{ height, minWidth: '150px' }}
        as={inputType}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      />
    </FloatingLabel>
  );
};

export default FormInput;
