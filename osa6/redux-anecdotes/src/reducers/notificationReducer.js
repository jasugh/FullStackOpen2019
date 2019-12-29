const initialState = {notification: null}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data
    default:
      return state
  }
}

export const showNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: {
        notification: notification
      }
    })

    setTimeout(() => {
      dispatch({
        type: 'SHOW',
        data: {
          notification: null
        }
      })
    }, time * 1000);
  }

}

export default notificationReducer
