// Frontend/src/components/common/OsteophytesModal.jsx
import React from 'react';
import BaseModal from './BaseModal';
import { osteophytesOptions } from '../../constants/osteophytesOptions';

const OsteophytesModal = ({ isOpen, onClose, insertTextToTextarea, title = 'Остеофиты' }) => {
  const handleOptionSelect = (option) => {
    insertTextToTextarea(option);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
    >
      <div className="modal-options">
        {osteophytesOptions.map((option) => (
          <button
            key={option.value}
            className="modal-option"
            onClick={() => handleOptionSelect(option.text)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </BaseModal>
  );
};

export default OsteophytesModal;