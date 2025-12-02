import GenericModalSection from "./GenericModalSection";
import PleuraExpansionModal from "./PleuraExpansionModal";

export default function PleuraSection({ insertTextToTextarea, setExpandedPlaque }) {
  const pleuraOptions = [
    { 
      label: "Без особенностей", 
      text: "куполообразной формы, расположена обычно", 
      hasModal: false 
    },
    { 
      label: "Патология", 
      hasModal: true 
    }
  ];

  return (
    <GenericModalSection
      options={pleuraOptions}
      modalComponent={PleuraExpansionModal}
      insertTextToTextarea={insertTextToTextarea}
      setExpandedPlaque={setExpandedPlaque}
    />
  );
}