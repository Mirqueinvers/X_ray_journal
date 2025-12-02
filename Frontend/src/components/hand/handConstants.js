// Frontend/src/components/hand/handConstants.js
export const HAND_JOINTS_RIGHT = [
  { key: "rightCmc1", label: "I", top: "18%", left: "33.7%" },
  { key: "rightCmc2", label: "II", top: "19%", left: "31%" },
  { key: "rightCmc3", label: "III", top: "19%", left: "28.5%" },
  { key: "rightCmc4", label: "IV", top: "21%", left: "26%" },
  { key: "rightCmc5", label: "V", top: "20%", left: "23%" },
  { key: "rightMcp1", label: "I", top: "37.5%", left: "38%" },
  { key: "rightMcp2", label: "II", top: "48%", left: "33.5%" },
  { key: "rightMcp3", label: "III", top: "48.5%", left: "28.8%" },
  { key: "rightMcp4", label: "IV", top: "46.7%", left: "24.6%" },
  { key: "rightMcp5", label: "V", top: "42.3%", left: "20.6%" },
  { key: "rightPip2", label: "II", top: "69.5%", left: "34.3%" },
  { key: "rightPip3", label: "III", top: "72.3%", left: "28.8%" },
  { key: "rightPip4", label: "IV", top: "68.5%", left: "23.5%" },
  { key: "rightPip5", label: "V", top: "59.5%", left: "19.5%" },
  { key: "rightDip2", label: "II", top: "82.5%", left: "34.5%" },
  { key: "rightDip3", label: "III", top: "88.4%", left: "29%" },
  { key: "rightDip4", label: "IV", top: "84%", left: "23.3%" },
  { key: "rightDip5", label: "V", top: "70%", left: "19.3%" },
  { key: "rightIp1", label: "I", top: "52.8%", left: "39.5%" },
  { key: "rightWrist", label: "ЛЗС", top: "5%", left: "28%" },
];

export const createHandJointMap = () => {
  const leftJoints = HAND_JOINTS_RIGHT.map(j => ({
    key: j.key.replace("right", "left"),
    label: j.label,
    top: j.top,
    left: `${100 - parseFloat(j.left)}%`,
  }));
  
  return [...HAND_JOINTS_RIGHT, ...leftJoints];
};

export const HAND_DEGREES_FULL = ["Не изменены", "Незначительно", "Умеренно", "Выраженно", "Резко"];
export const HAND_DEGREES_SURFACES = ["Не изменены", "Незначительно", "Умеренно", "Выраженно"];

export const HAND_INITIAL_STATE = () => ({
  rightCmc1: {}, rightCmc2: {}, rightCmc3: {}, rightCmc4: {}, rightCmc5: {},
  rightMcp1: {}, rightMcp2: {}, rightMcp3: {}, rightMcp4: {}, rightMcp5: {},
  rightPip2: {}, rightPip3: {}, rightPip4: {}, rightPip5: {},
  rightDip2: {}, rightDip3: {}, rightDip4: {}, rightDip5: {},
  rightIp1: {}, rightWrist: {},
  leftCmc1: {}, leftCmc2: {}, leftCmc3: {}, leftCmc4: {}, leftCmc5: {},
  leftMcp1: {}, leftMcp2: {}, leftMcp3: {}, leftMcp4: {}, leftMcp5: {},
  leftPip2: {}, leftPip3: {}, leftPip4: {}, leftPip5: {},
  leftDip2: {}, leftDip3: {}, leftDip4: {}, leftDip5: {},
  leftIp1: {}, leftWrist: {},
});