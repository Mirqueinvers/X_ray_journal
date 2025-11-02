import PlaqueButton from "../ui/PlaqueButton";

export default function CongruencySection({ setExpandedPlaque, insertTextToTextarea }) {
  const congruencyOptions = [
    "не нарушена",
    "нарушена в левом",
    "нарушена в правом",
  ];

  const insertCongruencyText = (option) => {
    const fullText = `\nКонгруэнтность суставных поверхностей ${option.toLowerCase()}.`;
    insertTextToTextarea(fullText);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {congruencyOptions.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={option}
          onClick={() => insertCongruencyText(option)}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
