const initialState = {notification: null}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data
    default:
      return state
  }
}

export const showNotification = (notification) => {
  return {
    type: 'SHOW',
    data: {
      notification: notification
    }
  }
}

export default notificationReducer
