import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Header, Menu} from 'semantic-ui-react'
import {connect} from "react-redux";
import blogService from "../../services/blogs";
import {logoutUser} from "../../reducers/loginReducer";


const Navbar = (props) => {

  const onLogout = () => {
    props.logoutUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  let link;
  if (props.loginUser) {
    link = (
      <div>
        { props.loginUser.name } logged in
        <Button
          onClick={ onLogout }
          basic
          color='red'
          style={ {marginLeft: 8} }
        >
          Logout
        </Button>
      </div>
    )
  } else {
    link = (
      <div>
        <Link to="/login">Login</Link>
      </div>
    )
  }

  return (
    <div>
      <Menu>
        <Header style={ {margin: 8, width: 100} } as='h2'>Blogs</Header>
        <Menu.Item link>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item>
          { link }
        </Menu.Item>
      </Menu>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser
  }
}

const mapDispatchToProps = {
  logoutUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)


