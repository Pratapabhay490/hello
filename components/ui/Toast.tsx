'use client';

import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setIsVisible(true);

    // Auto close
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: FaCheckCircle,
      bgColor: 'bg-green-500',
      textColor: 'text-white',
    },
    error: {
      icon: FaExclamationCircle,
      bgColor: 'bg-red-500',
      textColor: 'text-white',
    },
    info: {
      icon: FaInfoCircle,
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
    },
    warning: {
      icon: FaExclamationCircle,
      bgColor: 'bg-yellow-500',
      textColor: 'text-black',
    },
  };

  const { icon: Icon, bgColor, textColor } = config[type];

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div
        className={`${bgColor} ${textColor} rounded-lg shadow-2xl p-4 flex items-center space-x-3 min-w-[300px] max-w-[500px]`}
      >
        <Icon size={24} />
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className={`${textColor} hover:opacity-80 transition-opacity`}
          aria-label="Close"
        >
          <FaTimes size={18} />
        </button>
      </div>
    </div>
  );
};

// Toast Container for managing multiple toasts
interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50 space-y-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;
