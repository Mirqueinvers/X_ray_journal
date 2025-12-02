// Frontend/src/components/foot/FootJointSurfaceModal.jsx
import  FootModalBase  from "./FootModalBase.jsx";
import { generateDescriptionUniversalCombined } from "../generateDescription/HandFoot/generateDescriptionUniversalCombined.js";

export default function FootJointSurfaceModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <FootModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Изменения суставных поверхностей стоп"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionUniversalCombined}
      type="foot"
      mode="surfaces"
      showDegreeSelector={true}
    />
  );
}