// Frontend/src/components/elbow/ElbowJoinSpaceModal.jsx
import  ElbowModalBase  from "./ElbowModalBase.jsx";
import { generateDescriptionGapSurface } from "../generateDescription/AnkleWristElbow/generateDescriptionGapSurface.js";

export default function ElbowJoinSpaceModal({ isOpen, onClose, insertTextToTextarea }) {
  return (
    <ElbowModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Сужение суставной щели локтевых суставов"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionGapSurface}
      type="elbow"
      mode="gaps"
    />
  );
}