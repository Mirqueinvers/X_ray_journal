// Frontend/src/components/common/BaseModal.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  titleClassName = '',
  bodyClassName = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      // Блокируем скролл body
      document.body.style.overflow = 'hidden';
      
      // Создаем блокировочный элемент
      const blocker = document.createElement('div');
      blocker.id = 'base-modal-blocker';
      blocker.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99990;
        background: transparent;
        pointer-events: all;
      `;
      
      document.body.appendChild(blocker);
      
      return () => {
        document.body.style.overflow = '';
        const existingBlocker = document.getElementById('base-modal-blocker');
        if (existingBlocker) {
          existingBlocker.remove();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'w-[400px] h-[300px]',
    medium: 'w-[600px] h-[400px]',
    large: 'w-[800px] h-[600px]',
    full: 'w-[95vw] h-[95vh]',
    custom: '',
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const modalElement = (
    <div 
      className="fixed inset-0"
      style={{ 
        zIndex: 99999, // Поверх блокировочного элемента
        pointerEvents: 'auto'
      }}
    >
      {/* Фон модали */}
      <div 
        className={`absolute inset-0 bg-black/40 ${overlayClassName}`}
        onClick={handleOverlayClick}
        style={{ pointerEvents: 'all' }}
      />
      
      {/* Контент модали */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col ${
            size === 'custom' ? '' : sizeClasses[size]
          } ${className} ${contentClassName}`}
          style={{ 
            maxHeight: 'calc(100vh - 2rem)',
            pointerEvents: 'auto'
          }}
          role="dialog"
          aria-modal="true"
        >
          {showCloseButton && (
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-1 rounded-lg hover:bg-gray-100" 
              onClick={onClose}
              title="Закрыть"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {title && (
            <div className={`p-6 pb-4 border-b border-gray-200 ${titleClassName}`}>
              <h2 className="text-gray-800 font-semibold text-xl">{title}</h2>
            </div>
          )}
          
          <div className={`flex-1 overflow-auto ${bodyClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // Рендерим в portal для изоляции от остального DOM
  return createPortal(modalElement, document.body);
};

export default BaseModal;