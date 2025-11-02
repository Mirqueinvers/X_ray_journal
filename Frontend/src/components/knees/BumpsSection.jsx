import PlaqueButton from "../ui/PlaqueButton";

export default function BumpsSection({ setExpandedPlaque, insertTextToTextarea }) {
  const shapeOptions = [
    "не изменены",
    "заострены",
    "уплощены",
    "заострены справа",
    "заострены слева",
    "уплощены справа",
    "уплощены слева",
  ];

  const insertShapeText = (shape) => {
    const fullText = `Бугорки межмыщелковых возвышений ${shape}.`;
    insertTextToTextarea("\n" + fullText);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {shapeOptions.map((shape, idx) => (
        <PlaqueButton
          key={idx}
          label={shape}
          onClick={() => insertShapeText(shape)}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
