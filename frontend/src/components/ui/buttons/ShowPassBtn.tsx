import React from 'react';
import { Button } from 'react-bootstrap';

import EyeWithSlash from '../icons/EyeWithSlash';
import EyeWithoutSlash from '../icons/EyeWithoutSlash';

interface iShowPassButtonProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowPassButton: React.FC<iShowPassButtonProps> = (props) => {
  const { showPassword, setShowPassword } = props;
  return (
    <Button
      size="sm"
      variant="outline-secondary"
      className="position-absolute me-2 translate-middle-y top-50 end-0"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeWithSlash /> : <EyeWithoutSlash />}
    </Button>
  );
};

export default ShowPassButton;
