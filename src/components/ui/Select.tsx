import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  options,
  placeholder,
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      className={` rounded-lg w-[200px] border border-gray-300 px-2 bg-white  text-sm py-2 text-gray-900 transition-colors duration-200 ${className}`}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
