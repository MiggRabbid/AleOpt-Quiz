import React from 'react';
import { Button } from 'react-bootstrap';

import EyeWithSlash from '../icons/EyeWithSlash';
import EyeWithoutSlash from '../icons/EyeWithoutSlash';

interface iShowPassButtonProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isInvalid: boolean;
}

const ShowPassButton: React.FC<iShowPassButtonProps> = (props) => {
  const { showPassword, setShowPassword, isInvalid } = props;
  return (
    <Button
      size="sm"
      variant={!!isInvalid ? 'outline-danger' : 'outline-secondary'}
      className="py-0 px-3 m-0 rounded-start-0 border-0 w-100 h-100"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeWithSlash /> : <EyeWithoutSlash />}
    </Button>
  );
};

export default ShowPassButton;
