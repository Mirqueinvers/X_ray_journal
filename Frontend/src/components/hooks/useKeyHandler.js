import { useCallback } from 'react';

export const useKeyHandler = (handlers) => {
  const keyHandler = useCallback((e) => {
    // Обработка Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (handlers?.onEnter) {
        handlers.onEnter(e);
      }
    }
    
    // Обработка пробела
    if (e.key === ' ') {
      e.stopPropagation();
      // Не блокируем пробел - браузер сам его обработает
    }
  }, [handlers]);

  return keyHandler;
};