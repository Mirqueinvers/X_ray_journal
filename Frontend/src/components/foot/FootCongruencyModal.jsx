// Frontend/src/components/foot/FootCongruencyModal.jsx
import  FootModalBase  from "./FootModalBase.jsx";
import { generateDescriptionUniversalCongruence } from "../generateDescription/HandFoot/generateDescriptionCongruence.js";

export default function FootCongruencyModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <FootModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Конгруэнтность суставов стоп"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionUniversalCongruence}
      type="foot"
      customProperty="конгруэнтность"
    />
  );
}