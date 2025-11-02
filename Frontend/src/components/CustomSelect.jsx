import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function CustomSelect({ label, name, options, value, onChange, placeholder, dropdownWidth }) {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm text-gray-600 mb-1">
        {label} <span className="text-gray-900">*</span>
      </label>
      <div
        // ИЗMЕНЕНИЕ: Удалены классы фокуса
        className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800 flex justify-between items-center cursor-pointer shadow-sm transition-all border border-transparent outline-none"
        onClick={() => setOpen(!open)}
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span 
          className="truncate flex-grow" 
          title={value || placeholder}
        >
          {value || placeholder}
        </span>
        <ChevronDownIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
      </div>
      {open && (
        <ul
          style={{ width: dropdownWidth || '100%' }}
          className="absolute z-50 mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1"
        >
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange({
                  target: { name: name, value: opt },
                });
                setOpen(false);
              }}
              className="px-3 py-2 mx-1 hover:bg-gray-200 rounded-md cursor-pointer text-sm text-gray-800 transition-all"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
