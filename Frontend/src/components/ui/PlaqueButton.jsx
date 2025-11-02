import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function PlaqueButton({
  label,
  onClick,
  isExpanded,
  hasChildren,
  iconRight = true,
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className="
        w-full cursor-pointer
        bg-gray-50 hover:bg-gray-100
        border border-gray-200
        rounded-xl
        shadow-sm hover:shadow-md
        transition-all duration-150
        flex justify-between items-center
        p-3
      "
    >
      <span className="text-sm text-gray-800">{label}</span>

      {hasChildren && iconRight && (
        isExpanded ? (
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        )
      )}
    </div>
  );
}
