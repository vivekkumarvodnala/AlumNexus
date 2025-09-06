// src/components/Button.jsx
export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}) {
  const base =
    "px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center justify-center transition-colors";

  const styles =
    variant === "primary"
      ? "bg-primary text-black dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300"
      : variant === "secondary"
      ? "bg-gray-200 text-black dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300"
      : "border border-gray-300 text-white dark:text-yellow-400 dark:hover:text-yellow-300";

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
