/* eslint-disable indent */
const initialState = { message: '', type: '', timeoutId: null };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      if (state.timeoutId !== null) {
        clearTimeout(state.timeoutId);
      }
      return action.data;
    case 'DELETE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, type, timeout) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
      });
    }, timeout);
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: { message, type, timeoutId },
    });
  };
};

export default notificationReducer;
