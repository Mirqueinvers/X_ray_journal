import React, { useState, useEffect, useRef, forwardRef } from "react";

const AutocompleteInput = forwardRef(function AutocompleteInput(
  { name, value, options = [], placeholder, onChange, onBlur },
  ref // <-- сюда попадёт ref из родителя
) {
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter((opt) =>
        opt.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [value, options]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (opt) => {
    onChange({ target: { name, value: opt } });
    setShowOptions(false);
  };

return (
  <div className="relative mb-2" ref={wrapperRef}>
    <input
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={() => setShowOptions(true)}
      onBlur={onBlur} // <-- прокидываем onBlur сюда
      autoComplete="off"
      className="appearance-none border border-yellow-500 w-full px-2 py-1 rounded bg-gray-800 text-yellow-200"
      ref={ref}
    />
    {showOptions && filteredOptions.length > 0 && (
      <ul className="absolute z-10 bg-gray-900 border border-yellow-500 w-full mt-1 max-h-40 overflow-y-auto rounded shadow">
        {filteredOptions.map((opt) => (
          <li
            key={opt}
            onClick={() => handleOptionClick(opt)}
            className="px-3 py-1 hover:bg-yellow-700 cursor-pointer text-yellow-200"
          >
            {opt}
          </li>
        ))}
      </ul>
    )}
  </div>
);

});

export default AutocompleteInput;
