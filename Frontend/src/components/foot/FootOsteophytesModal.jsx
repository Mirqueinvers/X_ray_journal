// Frontend/src/components/foot/FootOsteophytesModal.jsx
import  FootModalBase  from "./FootModalBase.jsx";
import { generateDescriptionUniversalOsteophytes } from "../generateDescription/HandFoot/generateDescriptionOsteophytes.js";

export default function FootOsteophytesModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <FootModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Остеофиты суставов стоп"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionUniversalOsteophytes}
      type="foot"
      customProperty="остеофиты"
    />
  );
}