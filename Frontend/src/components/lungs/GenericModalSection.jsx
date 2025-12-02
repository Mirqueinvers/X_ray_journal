import { useModal } from "../hooks/useModal";
import { useTextInsertion } from "../hooks/useTextInsertion";
import PlaqueButton from "../ui/PlaqueButton";

export default function GenericModalSection({ 
  options, 
  modalComponent: ModalComponent,
  modalProps = {},
  insertTextToTextarea, 
  setExpandedPlaque 
}) {
  const { isOpen, openModal, closeModal } = useModal();
  const { insertText } = useTextInsertion(insertTextToTextarea, setExpandedPlaque);

  const handleOptionClick = (option) => {
    if (option.hasModal) {
      openModal();
    } else {
      insertText(option.text);
    }
  };

  return (
    <>
      <div className="ml-6 mt-1 space-y-1">
        {options.map((option, idx) => (
          <PlaqueButton
            key={idx}
            label={option.label}
            onClick={() => handleOptionClick(option)}
            hasChildren={false}
          />
        ))}
      </div>

      {isOpen && (
        <ModalComponent
          isOpen={isOpen}
          onClose={closeModal}
          insertTextToTextarea={insertTextToTextarea}
          setExpandedPlaque={setExpandedPlaque}
          {...modalProps}
        />
      )}
    </>
  );
}