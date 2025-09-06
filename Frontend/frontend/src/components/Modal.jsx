// src/components/Modal.jsx
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors text-lg font-bold"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
