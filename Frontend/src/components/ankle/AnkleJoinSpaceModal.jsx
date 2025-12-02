// Frontend/src/components/ankle/AnkleJoinSpaceModal.jsx
import  AnkleModalBase  from "./AnkleModalBase.jsx";
import { generateDescriptionGapSurface } from "../generateDescription/AnkleWristElbow/generateDescriptionGapSurface.js";

export default function AnkleJoinSpaceModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <AnkleModalBase
      isOpen={isOpen}
      onClose={onClose}
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionGapSurface}
      type="ankle"
      mode="gaps"
    />
  );
}