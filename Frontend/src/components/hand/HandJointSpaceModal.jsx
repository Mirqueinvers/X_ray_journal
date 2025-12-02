// Frontend/src/components/hand/HandJointSpaceModal.jsx
import  HandModalBase from "./HandModalBase.jsx";
import { generateDescriptionUniversalCombined } from "../generateDescription/HandFoot/generateDescriptionUniversalCombined.js";
import { HAND_DEGREES_FULL } from "./handConstants.js";

export default function HandJointSpaceModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <HandModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Сужение суставных щелей кистей"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionUniversalCombined}
      type="hand"
      mode="gaps"
      showDegreeSelector={true}
      degrees={HAND_DEGREES_FULL}
    />
  );
}