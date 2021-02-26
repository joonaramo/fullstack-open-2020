const initialState = {};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      const newNotification = action.data;
      return newNotification;
    case 'DELETE_NOTIFICATION':
      return {};
    default:
      return state;
  }
};

export const createNotification = (message) => {
  return {
    type: 'CREATE_NOTIFICATION',
    data: {
      message,
    },
  };
};

export const deleteNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION',
  };
};

export default notificationReducer;
