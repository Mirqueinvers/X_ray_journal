import { useTextInsertion } from "../hooks/useTextInsertion";
import PlaqueButton from "../ui/PlaqueButton";

export default function GenericOptionsSection({ 
  options, 
  textPrefix,
  insertTextToTextarea, 
  setExpandedPlaque 
}) {
  const { insertText } = useTextInsertion(insertTextToTextarea, setExpandedPlaque);

  const handleOptionClick = (option) => {
    const text = typeof option === 'string' 
      ? option 
      : option.text;
    
    insertText(`\n${textPrefix} ${text}.`);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {options.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={typeof option === 'string' ? option : option.label}
          onClick={() => handleOptionClick(option)}
          hasChildren={false}
        />
      ))}
    </div>
  );
}