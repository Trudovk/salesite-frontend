import React, { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectDropdownProps {
  options: Option[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
}

const CustomSelectDropdown: React.FC<CustomSelectDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setOpen(prev => !prev);
  };

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={selectRef} className={`relative inline-block w-full ${className}`}>
      <div
        onClick={toggleOpen}
        className="cursor-pointer border rounded-lg px-3 py-2  dark:bg-gray-950 flex justify-between items-center"
      >
        <span className={selectedOption ? '' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg className="h-4 w-4 fill-current text-gray-700 dark:text-white" viewBox="0 0 20 20">
          <path d="M7 7l3 3 3-3" />
        </svg>
      </div>
      {open && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-950 border rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelectDropdown;
