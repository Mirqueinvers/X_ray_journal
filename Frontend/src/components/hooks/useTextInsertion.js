export function useTextInsertion(insertTextToTextarea, setExpandedPlaque) {
  const insertText = (text) => {
    insertTextToTextarea(text);
    setExpandedPlaque(null);
  };

  return { insertText };
}