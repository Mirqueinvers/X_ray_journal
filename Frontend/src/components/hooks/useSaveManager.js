import { useState, useCallback } from 'react';

export const useSaveManager = (researchId, getText) => {
  const [saveStatus, setSaveStatus] = useState({
    saving: false,
    success: false,
    error: null
  });

  const save = useCallback(async () => {
    if (!researchId || !getText) return false;
    
    setSaveStatus(prev => ({ ...prev, saving: true, error: null }));
    
    const textToSave = getText();
    
    try {
      const res = await fetch(`http://localhost:5000/api/save-research-description`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          research_id: researchId, 
          description: textToSave 
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSaveStatus(prev => ({ 
          ...prev, 
          saving: false, 
          success: true 
        }));
        
        setTimeout(() => {
          setSaveStatus(prev => ({ ...prev, success: false }));
        }, 2000);
        
        return true;
      } else {
        setSaveStatus(prev => ({ 
          ...prev, 
          saving: false, 
          error: data.error || 'Ошибка сохранения' 
        }));
        return false;
      }
    } catch (err) {
      setSaveStatus(prev => ({ 
        ...prev, 
        saving: false, 
        error: 'Ошибка запроса' 
      }));
      return false;
    }
  }, [researchId, getText]);

  const copyToClipboard = useCallback(async () => {
    if (!navigator.clipboard) return false;
    
    try {
      const text = getText();
      await navigator.clipboard.writeText(`\n\n${text}\n`);
      return true;
    } catch (err) {
      console.error('Ошибка копирования:', err);
      return false;
    }
  }, [getText]);

  return {
    saveStatus,
    save,
    copyToClipboard
  };
};