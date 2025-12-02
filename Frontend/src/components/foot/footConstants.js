// Frontend/src/components/foot/footConstants.js
export const FOOT_JOINTS_RIGHT = [
  { key: "rightTmt1", label: "I", top: "41%", left: "40.5%" },
  { key: "rightTmt2", label: "II", top: "39%", left: "37.2%" },
  { key: "rightTmt3", label: "III", top: "39%", left: "34.2%" },
  { key: "rightTmt4", label: "IV", top: "34%", left: "31.7%" },
  { key: "rightTmt5", label: "V", top: "30%", left: "29%" },
  { key: "rightMtp1", label: "I", top: "71%", left: "43%" },
  { key: "rightMtp2", label: "II", top: "72%", left: "38%" },
  { key: "rightMtp3", label: "III", top: "72%", left: "35%" },
  { key: "rightMtp4", label: "IV", top: "69%", left: "32.5%" },
  { key: "rightMtp5", label: "V", top: "61%", left: "29.5%" },
  { key: "rightPIP2", label: "II", top: "85.7%", left: "38%" },
  { key: "rightPIP3", label: "III", top: "84.5%", left: "35%" },
  { key: "rightPIP4", label: "IV", top: "80%", left: "32%" },
  { key: "rightPIP5", label: "V", top: "71%", left: "29.5%" },
  { key: "rightDIP2", label: "II", top: "92%", left: "38%" },
  { key: "rightDIP3", label: "III", top: "91%", left: "35%" },
  { key: "rightDIP4", label: "IV", top: "87%", left: "32%" },
  { key: "rightDIP5", label: "V", top: "78%", left: "29.3%" },
  { key: "rightIP1", label: "I", top: "86%", left: "42%" },
];

export const createFootJointMap = () => {
  const leftJoints = FOOT_JOINTS_RIGHT.map(j => {
    const leftNum = parseFloat(j.left);
    return {
      key: j.key.replace("right", "left"),
      label: j.label,
      top: j.top,
      left: `${100 - leftNum}%`,
    };
  });
  
  return [...FOOT_JOINTS_RIGHT, ...leftJoints];
};

export const FOOT_DEGREES = ["Не изменены", "Незначительно", "Умеренно", "Выраженно", "Резко"];

export const FOOT_INITIAL_STATE = () => ({
  rightTmt1: {}, rightTmt2: {}, rightTmt3: {}, rightTmt4: {}, rightTmt5: {},
  rightMtp1: {}, rightMtp2: {}, rightMtp3: {}, rightMtp4: {}, rightMtp5: {},
  rightPIP2: {}, rightPIP3: {}, rightPIP4: {}, rightPIP5: {},
  rightDIP2: {}, rightDIP3: {}, rightDIP4: {}, rightDIP5: {},
  rightIP1: {},
  leftTmt1: {}, leftTmt2: {}, leftTmt3: {}, leftTmt4: {}, leftTmt5: {},
  leftMtp1: {}, leftMtp2: {}, leftMtp3: {}, leftMtp4: {}, leftMtp5: {},
  leftPIP2: {}, leftPIP3: {}, leftPIP4: {}, leftPIP5: {},
  leftDIP2: {}, leftDIP3: {}, leftDIP4: {}, leftDIP5: {},
  leftIP1: {},
});