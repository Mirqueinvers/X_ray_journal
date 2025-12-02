// Frontend/src/components/hand/HandOsteophytesModal.jsx
import  HandModalBase  from "./HandModalBase.jsx";
import { generateDescriptionUniversalOsteophytes } from "../generateDescription/HandFoot/generateDescriptionOsteophytes.js";

export default function HandOsteophytesModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <HandModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Остеофиты суставов кистей"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionUniversalOsteophytes}
      type="hand"
      customProperty="остеофиты"
    />
  );
}