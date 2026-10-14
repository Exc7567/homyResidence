import { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);
  const timer = useRef(null);
  const show = useCallback((text) => {
    clearTimeout(timer.current);
    setMessage({ text, key: Date.now() });
    timer.current = setTimeout(() => setMessage(null), 2500);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {message && (
          <div key={message.key} className="toast animate-fade-up">
            {message.text}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
