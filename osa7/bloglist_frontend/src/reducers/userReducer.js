const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.user
    default:
      return state
  }
}

export const initializeUser = (user) => {
  return {
    type: 'INIT_USER',
    user
  }
}

export default userReducer
