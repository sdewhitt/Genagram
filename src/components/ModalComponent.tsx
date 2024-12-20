import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('body'); 

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onRequestClose, contentLabel }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <h2>{contentLabel}</h2>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ModalComponent;