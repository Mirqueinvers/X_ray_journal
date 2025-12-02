// Frontend/src/components/hand/HandCongruencyModal.jsx
import  HandModalBase  from "./HandModalBase.jsx";
import { generateDescriptionUniversalCongruence } from "../generateDescription/HandFoot/generateDescriptionCongruence.js";

export default function HandCongruencyModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <HandModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Конгруэнтность суставов кистей"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionUniversalCongruence}
      type="hand"
      customProperty="конгруэнтность"
      showCongruencyMode={true}
    />
  );
}