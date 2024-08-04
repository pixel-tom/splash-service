import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: 'bottomRight',
    });
  };

  return (
    <NotificationContext.Provider value={openNotification}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
