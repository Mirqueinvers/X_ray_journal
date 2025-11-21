import { useState, useRef, useEffect, useCallback } from 'react';

export const useTextEditor = (initialText) => {
  const [text, setText] = useState(initialText);
  const [insertionData, setInsertionData] = useState(null);
  const textareaRef = useRef(null);

  // Обработка вставки текста
  useEffect(() => {
    if (!insertionData || !textareaRef.current) return;
    
    const { textToInsert } = insertionData;
    
    setText(prev => prev + textToInsert);
    setInsertionData(null);
  }, [insertionData]);

  // Вставка текста
  const insertText = useCallback((textToInsert) => {
    setInsertionData({ textToInsert });
  }, []);

  // Фокус на поле
  const focusField = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Автофокус при монтировании
  useEffect(() => {
    const timer = setTimeout(() => {
      focusField();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [focusField]);

  return {
    text,
    setText,
    insertText,
    textareaRef
  };
};