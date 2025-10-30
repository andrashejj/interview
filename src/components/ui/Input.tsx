import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onClear?: () => void;
  showClearButton?: boolean;
}

export function Input({
  icon,
  onClear,
  showClearButton,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      )}
      <input
        className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors duration-200 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:outline-none ${
          icon ? "pl-10" : ""
        } ${showClearButton ? "pr-10" : ""} ${className}`}
        {...props}
      />
      {showClearButton && props.value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
