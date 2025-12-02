// Frontend/src/components/hand/HandJointSurfaceModal.jsx
import  HandModalBase  from "./HandModalBase.jsx";
import { generateDescriptionUniversalCombined } from "../generateDescription/HandFoot/generateDescriptionUniversalCombined.js";
import { HAND_DEGREES_SURFACES } from "./handConstants.js";

export default function HandJointSurfaceModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <HandModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Изменения суставных поверхностей кистей"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionUniversalCombined}
      type="hand"
      mode="surfaces"
      showDegreeSelector={true}
      degrees={HAND_DEGREES_SURFACES}
    />
  );
}