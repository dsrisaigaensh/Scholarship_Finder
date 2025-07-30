import React from 'react';

interface ToastProps {
  title: string;
  description?: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, description, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl px-8 py-6 flex flex-col items-center max-w-xs w-full border border-purple-300">
        <h3 className="text-lg font-bold text-purple-800 mb-2 text-center">{title}</h3>
        {description && <p className="text-gray-700 mb-4 text-center">{description}</p>}
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold focus:outline-none"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Toast; 