import GenericModalSection from "./GenericModalSection";
import RibsModal from "./RibsModal";

export default function ChestCageSection({ insertTextToTextarea, setExpandedPlaque }) {
  const chestCageOptions = [
    { 
      label: "Норма", 
      text: "Целостность костей грудной клетки не нарушена", 
      hasModal: false 
    },
    { 
      label: "Патология", 
      hasModal: true 
    }
  ];

  return (
    <GenericModalSection
      options={chestCageOptions}
      modalComponent={RibsModal}
      insertTextToTextarea={insertTextToTextarea}
      setExpandedPlaque={setExpandedPlaque}
    />
  );
}