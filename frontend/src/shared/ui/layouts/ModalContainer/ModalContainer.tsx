import { ReactNode } from 'react';
import { Box, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface IModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  withoutExitBtn?: true;
}

const ModalContainer = (props: IModalContainerProps) => {
  const { isOpen, onClose, children, withoutExitBtn } = props;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <Box
        className="relative flex h-fit w-fit items-center justify-center rounded-xl bg-white"
        role="document"
      >
        {!withoutExitBtn && (
          <Button
            className="absolute! top-5 right-5 h-10! min-h-10! w-10! min-w-10! rounded-full! p-0!"
            color="success"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            aria-label="Close-modal"
          >
            <CloseIcon />
          </Button>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default ModalContainer;
