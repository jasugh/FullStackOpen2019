const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const loginUser = (user) => {
  return {
    type: 'LOGIN',
    data: { username:user.username, name: user.name}
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT',
  }
}

export default loginReducer
