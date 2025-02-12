import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function ToastNotification({ message, onClose }: ToastProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed right-4 bottom-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  );
}
