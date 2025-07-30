import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from '../components/Toast';

interface ToastContextType {
  toast: (opts: { title: string; description?: string }) => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
});

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastState, setToastState] = useState<{
    title: string;
    description?: string;
    open: boolean;
  }>({ title: '', description: '', open: false });

  const showToast = ({ title, description }: { title: string; description?: string }) => {
    setToastState({ title, description, open: true });
  };

  const handleClose = () => {
    setToastState((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ toast: showToast }}>
      {children}
      {toastState.open && (
        <Toast
          title={toastState.title}
          description={toastState.description}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext); 