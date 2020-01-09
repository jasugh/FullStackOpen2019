import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import loginService from "../services/login";
import blogService from "../services/blogs";
import {useField} from '../hooks'
import {setNotification} from "../reducers/notificationReducer";
import {loginUser} from "../reducers/loginReducer";
import {connect} from "react-redux";

let LoginForm = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')
  const [user, setUser] = useState(null)

  const notify = (notification, type) => {
    props.setNotification({notification, type}, 5)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      props.loginUser(user)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      props.history.push('/')
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  return (
    <Form onSubmit={ onSubmit }>
      <br/>
      <Form.Field>
        <label>Username</label>
        <input
          name="username"
          { ...username }/>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          name="password"
          { ...password }/>
      </Form.Field>
      <Button
        color='blue'
        type='submit'
      >
        Login
      </Button>
    </Form>
  )
}

const mapDispatchToProps = {
  setNotification,
  loginUser,
}

export default connect(null, mapDispatchToProps)(LoginForm)
