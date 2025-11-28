// Frontend/src/hooks/useModal.js
import { useState } from 'react';

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(prev => !prev);
  
  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    setIsOpen
  };
};

// Дополнительный хук для модалок с данными
export const useModalWithData = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [modalData, setModalData] = useState(null);
  
  const openModal = (data = null) => {
    setModalData(data);
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };
  
  const toggleModal = (data = null) => {
    if (!isOpen) {
      setModalData(data);
    } else {
      setModalData(null);
    }
    setIsOpen(prev => !prev);
  };
  
  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    toggleModal,
    setIsOpen,
    setModalData
  };
};