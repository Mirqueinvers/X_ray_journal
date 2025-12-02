// Frontend/src/components/foot/FootJointSpaceModal.jsx
import  FootModalBase  from "./FootModalBase.jsx";
import { generateDescriptionUniversalCombined } from "../generateDescription/HandFoot/generateDescriptionUniversalCombined.js";

export default function FootJointSpaceModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <FootModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Сужение суставных щелей стоп"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionUniversalCombined}
      type="foot"
      mode="gaps"
      showDegreeSelector={true}
    />
  );
}