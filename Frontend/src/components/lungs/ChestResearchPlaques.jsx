import PlaqueButton from "../ui/PlaqueButton";

export default function ChestResearchPlaques({ setOpenModal }) {
  const chestPlaques = [
    "Ребра",
  ];

  return (
    <div className="mt-4 h-[500px] overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-800">
      {chestPlaques.map((plaque, idx) => (
        <PlaqueButton
          key={idx}
          label={plaque}
          onClick={() => setOpenModal("RibsModal")}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
