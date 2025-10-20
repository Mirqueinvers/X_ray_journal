import React, { useState } from "react";

export default function FootCongruencyModal({ isOpen, onClose, textareaRef }) {
  const [selectedOptions, setSelectedOptions] = useState({
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

  const [isNormal, setIsNormal] = useState(true); // по умолчанию Норма

  const rightJoints = [
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

  const leftJoints = rightJoints.map(j => ({
    key: j.key.replace("right", "left"),
    label: j.label,
    top: j.top,
    left: `${100 - parseFloat(j.left)}%`,
  }));

  const jointMap = [...rightJoints, ...leftJoints];

  const toggleJoint = (key) => {
    setSelectedOptions(prev => {
      const joint = prev[key] || {};
      // если выбираем сустав — снимаем Норму
      setIsNormal(false);
      return { ...prev, [key]: { конгруэнтность: !joint.конгруэнтность } };
    });
  };

  const generateDescription = () => {
    if (isNormal) return "Конгруэнтность суставных поверхностей не нарушена.";

    const footNames = { right: "правой", left: "левой" };
    const jointGroups = {
      Mtp: { plural: "плюснефаланговых суставах", single: "плюснефаланговом суставе" },
      PIP: { plural: "проксимальных межфаланговых суставах", single: "проксимальном межфаланговом суставе" },
      DIP: { plural: "дистальных межфаланговых суставах", single: "дистальном межфаланговом суставе" },
      Tmt: { plural: "предплюсне-плюсневых суставах", single: "предплюсне-плюсневом суставе" },
      IP: { plural: "межфаланговых суставах I пальца", single: "межфаланговом суставе I пальца" },
    };

    const romanToNum = { I: 1, II: 2, III: 3, IV: 4, V: 5 };
    const numToRoman = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" };
    const compressFingers = (labels) => {
      const nums = labels.map(l => romanToNum[l]).filter(Boolean).sort((a,b)=>a-b);
      if (!nums.length) return "";
      const ranges = [];
      let start = nums[0], end = nums[0];
      for (let i=1; i<=nums.length; i++){
        if(nums[i]===end+1) end=nums[i]; else {ranges.push(start===end?numToRoman[start]:`${numToRoman[start]}–${numToRoman[end]}`); start=end=nums[i];}
      }
      return ranges.join(", ");
    };

    const footGroups = {};
    ["right","left"].forEach(foot=>{
      jointMap.forEach(j=>{
        if(!j.key.startsWith(foot)) return;
        const joint = selectedOptions[j.key];
        if(!joint || !joint.конгруэнтность) return;
        const type = Object.keys(jointGroups).find(t=>j.key.includes(t));
        if(!type) return;
        footGroups[foot] = footGroups[foot]||{};
        footGroups[foot][type] = footGroups[foot][type]||[];
        footGroups[foot][type].push(j.label);
      });
    });

    const footParts = [];
    Object.entries(footGroups).forEach(([foot, types])=>{
      const typeParts=[];
      Object.entries(types).forEach(([type, labels])=>{
        const joint=jointGroups[type];
        const fingers=compressFingers(labels);
        if(type==="IP" || labels.length===1){typeParts.push(`${joint.single} ${footNames[foot]} стопы`);}
        else {typeParts.push(`${fingers} ${joint.plural} ${footNames[foot]} стопы`);}
      });
      if(typeParts.length) footParts.push(typeParts.join(", "));
    });

    if(!footParts.length) return "Нарушение конгруэнтности суставов не выявлено.";

    return `Нарушена конгруэнтность в ${footParts.join("; ")}.`;
  };

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-auto p-6" onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10">✖</button>

        {/* Кнопка "Норма" */}
        <div className="absolute left-4 top-4 flex flex-col gap-2 z-20">
          <button
            onClick={() => {
              setIsNormal(true);
              // снимаем выделение суставов
              setSelectedOptions(prev=>{
                const cleared = {};
                Object.keys(prev).forEach(k=>{cleared[k]={};});
                return cleared;
              });
            }}
            className={`px-4 py-2 rounded font-medium text-sm ${isNormal ? "bg-green-500 text-gray-900" : "bg-gray-600 text-white"}`}
          >
            Норма
          </button>
        </div>

        {/* Фон и суставы */}
        <div className="w-full h-full relative">
          <div className="absolute inset-0 pointer-events-none"
               style={{
                 backgroundImage: `url(/images/foot-right1.png), url(/images/foot-left1.png)`,
                 backgroundPosition: "30% 95%, 70% 95%",
                 backgroundRepeat: "no-repeat, no-repeat",
                 backgroundSize: "25% auto, 25% auto",
               }}
          ></div>

          {jointMap.map(j=>{
            const joint = selectedOptions[j.key];
            const isSelected = joint && joint.конгруэнтность;
            return (
              <div key={j.key}
                   className={`absolute flex items-center justify-center border-2 rounded-lg cursor-pointer transition-all duration-200
                               w-[35px] h-[35px] ${isSelected ? "bg-yellow-200/30 border-yellow-400" : "bg-transparent border-yellow-500"}`}
                   style={{top:j.top, left:j.left, transform:"translate(-50%, -50%)"}}
                   onClick={()=>toggleJoint(j.key)}
              >
                <span className="text-[8px] font-medium text-black">{j.label}</span>
              </div>
            );
          })}
        </div>

        {/* Кнопка Добавить */}
        <div className="absolute bottom-4 left-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
            onClick={()=>{
              if(textareaRef?.current){
                const textarea=textareaRef.current;
                const prefix = textarea.value.length>0 ? "\n" : "";
                textarea.value = textarea.value + prefix + generateDescription();
                textarea.dispatchEvent(new Event("input",{bubbles:true}));
              }
              onClose();
            }}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}
