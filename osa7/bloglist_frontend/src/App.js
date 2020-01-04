import React, {useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'

import Blogs from './components/blog/Blogs'
import Blog from './components/blog/Blog'
import Users from './components/user/Users'
import User from './components/user/User'
import Navbar from './components/layout/Navbar'
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from './services/blogs'
import {loginUser} from '../src/reducers/loginReducer'

const App = (props) => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.loginUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <Container>
      {/*<p>{ user.name } logged in</p>*/ }
      {/*<button onClick={ handleLogout }>logout</button>*/ }

      <Router>
        {/*<ThemeProvider theme={theme}>*/ }
        <Navbar/>
        <br/>
        <Notification notification={ props.notification }/>
        <Route>
          <Switch>
            <Route exact path="/" component={ Blogs }/>
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/users" component={ Users }/>
            <Route exact path="/user/:id" component={ User }/>
            <Route exact path='/blog/:id' render={({ match }) =>
              <Blog blog={props.blogs.find(b => b.id === match.params.id)} />
            } />
          </Switch>
        </Route>
        {/*</ThemeProvider>*/ }
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)