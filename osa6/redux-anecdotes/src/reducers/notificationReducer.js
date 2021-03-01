const initialState = { message: '', timeoutId: null };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      if (state.timeoutId !== null) {
        clearTimeout(state.timeoutId);
      }
      const newNotification = action.data;
      return newNotification;
    case 'DELETE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
      });
    }, timeout);
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: { message, timeoutId },
    });
  };
};

export default notificationReducer;
