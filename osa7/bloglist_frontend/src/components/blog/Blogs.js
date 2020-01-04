import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import blogService from '../../services/blogs'
import NewBlog from './NewBlog'
import Togglable from '../Togglable'
import {initializeBlogs, newBlog} from '../../reducers/blogsReducer'
import {setNotification} from '../../reducers/notificationReducer'
import {loginUser} from '../../reducers/loginReducer'
import {Header, Table} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'

const Blogs = (props) => {
  const [user, setUser] = useState(null)

  let history = useHistory()

  useEffect(() => {
    props.initializeBlogs()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (notification, type) => {
    props.setNotification({notification, type}, 5)
  }

  const createBlog = async (blog) => {
    props.newBlog(blog)
    newBlogRef.current.toggleVisibility()
  }

  const handleClick = id => {
    history.push(`/blog/${ id }`)
  }

  const newBlogRef = React.createRef()

  if (props.blogs === undefined) {
    return null
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Togglable buttonLabel='Create new' ref={ newBlogRef }>
        <NewBlog createBlog={ createBlog }/>
      </Togglable>

      <br/>
      <Header as='h2'>Blogs</Header>
      <Table striped attached selectable>
        <Table.Body>
          { props.blogs.sort(byLikes).map(blog =>
            <Table.Row
              key={ blog.id }
              onClick={ () => {
                handleClick(blog.id)
              } }
            >
              <Table.Cell>
                { blog.title }
              </Table.Cell>
            </Table.Row>
          ) }
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  newBlog,
  loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)