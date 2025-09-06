// src/components/Input.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Props:
 *  id, label, type, value, onChange, placeholder, error
 */
export default function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-1 text-accent/90 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={id}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
            error ? "border-red-400" : "border-gray-200 dark:border-gray-700"
          } dark:bg-gray-800 dark:text-white`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
