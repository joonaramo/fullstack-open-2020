const initialState = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      const newNotification = action.data;
      return newNotification;
    case 'DELETE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: message,
    });
    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
      });
    }, timeout);
  };
};

export default notificationReducer;
