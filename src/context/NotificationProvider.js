import React, { createContext, useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Ensure the component is rendered only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const openNotification = (type, message, description) => {
    const id = Date.now();
    setNotifications((prev) => [
      ...prev,
      { id, type, message, description },
    ]);

    // Automatically remove notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={openNotification}>
      {children}
      {/* Ensure portal only renders on the client */}
      {isClient &&
        createPortal(
          <div className="fixed bottom-5 right-5 space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start p-4 border-l-4 shadow-lg rounded-lg bg-white ${
                  notification.type === "success"
                    ? "border-green-500"
                    : notification.type === "error"
                    ? "border-red-500"
                    : "border-blue-500"
                }`}
              >
                <div className="flex-grow">
                  <p className="font-bold">
                    {notification.message}
                  </p>
                  <p className="text-sm">
                    {notification.description}
                  </p>
                </div>
                <button
                  className="ml-4 text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.filter((notif) => notif.id !== notification.id)
                    )
                  }
                >
                  &times;
                </button>
              </div>
            ))}
          </div>,
          document.body
        )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
