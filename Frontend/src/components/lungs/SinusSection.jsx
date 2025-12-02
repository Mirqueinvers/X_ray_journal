import GenericModalSection from "./GenericModalSection";
import SinusExpansionModal from "./SinusExpansionModal";

export default function SinusSection({ insertTextToTextarea, setExpandedPlaque }) {
  const sinusOptions = [
    { 
      label: "Свободны", 
      text: "свободны", 
      hasModal: false 
    },
    { 
      label: "Патология", 
      hasModal: true 
    }
  ];

  return (
    <GenericModalSection
      options={sinusOptions}
      modalComponent={SinusExpansionModal}
      insertTextToTextarea={insertTextToTextarea}
      setExpandedPlaque={setExpandedPlaque}
    />
  );
}