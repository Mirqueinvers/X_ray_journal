import { useState, useCallback } from 'react';

export const useModalManager = () => {
  const [openModal, setOpenModal] = useState(null);
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);

  const openModalHandler = useCallback((modalName) => {
    setOpenModal(modalName);
    setIsNestedModalOpen(true);
  }, []);

  const closeModalHandler = useCallback(() => {
    setIsNestedModalOpen(false);
    setOpenModal(null);
  }, []);

  return {
    openModal,
    isNestedModalOpen,
    openModal: openModalHandler,
    closeModal: closeModalHandler
  };
};