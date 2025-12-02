// Frontend/src/components/ankle/AnkleJointSurfaceModal.jsx
import  AnkleModalBase  from "./AnkleModalBase.jsx";
import { generateDescriptionGapSurface } from "../generateDescription/AnkleWristElbow/generateDescriptionGapSurface.js";

export default function AnkleJointSurfaceModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <AnkleModalBase
      isOpen={isOpen}
      onClose={onClose}
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionGapSurface}
      type="ankle"
      mode="surfaces"
    />
  );
}