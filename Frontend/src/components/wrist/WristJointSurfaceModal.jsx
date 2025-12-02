import WristModalBase from "./WristModalBase.jsx";
import { generateDescriptionGapSurface } from "../generateDescription/AnkleWristElbow/generateDescriptionGapSurface.js";

export default function WristJointSurfaceModal({ isOpen = true, onClose, insertTextToTextarea }) {
  return (
    <WristModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Поверхности лучезапястных суставов"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionGapSurface}
      type="Wrist"
      mode="surfaces"
    />
  );
}