import React from 'react'

const LoginForm = ({handleLogin, username, password}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={ handleLogin }>
        <div>
          username
          <input  { ...username } />
        </div>
        <div>
          password
          <input { ...password }/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm