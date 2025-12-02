// Frontend/src/components/elbow/ElbowJointSurfaceModal.jsx
import  ElbowModalBase  from "./ElbowModalBase.jsx";
import { generateDescriptionGapSurface } from "../generateDescription/AnkleWristElbow/generateDescriptionGapSurface.js";

export default function ElbowJointSurfaceModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <ElbowModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Изменения суставных поверхностей локтевых суставов"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionGapSurface}
      type="elbow"
      mode="surfaces"
    />
  );
}