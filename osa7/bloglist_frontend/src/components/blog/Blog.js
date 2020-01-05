import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Card, Feed, Button, Header} from 'semantic-ui-react'

import BlogComments from './BlogComments'
import {useField} from '../../hooks'
import {setNotification} from '../../reducers/notificationReducer'
import {removeBlog, likeBlog} from '../../reducers/blogsReducer'
import {useHistory} from 'react-router-dom'

const Blog = (props) => {
  const [comment, commentReset] = useField('text')
  const [delButton, setDelButton] = useState(false);
  let history = useHistory()

  const notify = (notification, type) => {
    props.setNotification({notification, type}, 5)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${ blog.title } by ${ blog.author }`)
    if (ok) {
      await props.removeBlog(blog)
      notify(`blog ${ blog.title } by ${ blog.author } removed!`)
      history.push('/')
    }
  }

  const likeBlog = (blog) => {
    const likedBlog = {...blog, likes: blog.likes + 1}
    props.likeBlog(likedBlog)
    notify(`blog ${ likedBlog.title } by ${ likedBlog.author } liked!`)
  }

  const deleteButton = () => {
    if (props.loginUser === null) {
      return true
    }
    return props.loginUser.username !== props.blog.user.username
  }

  if (props.blog === undefined) {
    return null
  }

  return (
    <Card style={ {width: '100%'} }>
      <Card.Content>
        <Card.Header content={ props.blog.title }/>
        <br/>
        <Feed.Event>
          <Feed.Summary>
            <a>{ props.blog.url }</a>
          </Feed.Summary>
        </Feed.Event>
        <br/>
        <Card.Content content={ `Added by ${ props.blog.author }` }/>
        <br/>
        <Card.Content content={ `Likes ${ props.blog.likes }` }/>
        <Header as='h4'>Comments</Header>

        {/**/ }
        {/*<Form onSubmit={ commentBlog }>*/ }
        {/*  <Form.Field>*/ }
        {/*    <input { ...comment }/>*/ }
        {/*  </Form.Field>*/ }
        {/*  <Button*/ }
        {/*    color='blue'*/ }
        {/*    type='submit'*/ }
        {/*  >*/ }
        {/*    Comment*/ }
        {/*  </Button>*/ }
        {/*</Form>*/ }
        {/*<br/>*/ }
        {/**/ }

        {/**/ }
        <BlogComments blog={ props.blog }/>
        {/**/ }

        <br/>
        <Button
          onClick={ () => likeBlog(props.blog) }
          basic
          color='blue'
        >
          Like
        </Button>
        <Button
          disabled={ deleteButton() }
          onClick={ () => removeBlog(props.blog) }
          basic
          color='red'
        >
          Delete
        </Button>
      </Card.Content>
    </Card>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: ownProps.blog,
    loginUser: state.loginUser,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification,
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog)
