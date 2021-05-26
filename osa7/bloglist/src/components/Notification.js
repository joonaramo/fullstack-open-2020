import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification) {
    return (
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
    );
  }
  return null;
};

export default Notification;
