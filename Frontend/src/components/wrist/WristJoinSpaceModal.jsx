import WristModalBase from "./WristModalBase.jsx";
import { generateDescriptionGapSurface } from "../generateDescription/AnkleWristElbow/generateDescriptionGapSurface.js";

export default function WristJoinSpaceModal({ onClose, insertTextToTextarea }) {
  return (
    <WristModalBase
      isOpen={true}
      onClose={onClose}
      title="Щели лучезапястных суставов"
      insertTextToTextarea={insertTextToTextarea}
      generatorFunction={generateDescriptionGapSurface}
      type="wrist"
      mode="gaps"
    />
  );
}