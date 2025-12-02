import GenericModalSection from "./GenericModalSection";
import HilaExpansionModal from "./HilaExpansionModal";

export default function HilaSection({ insertTextToTextarea, setExpandedPlaque }) {
  const hilaOptions = [
    { 
      label: "Не расширены", 
      text: "Корни легких не расширены, структурные", 
      hasModal: false 
    },
    { 
      label: "Расширены", 
      hasModal: true 
    }
  ];

  return (
    <GenericModalSection
      options={hilaOptions}
      modalComponent={HilaExpansionModal}
      insertTextToTextarea={insertTextToTextarea}
      setExpandedPlaque={setExpandedPlaque}
    />
  );
}