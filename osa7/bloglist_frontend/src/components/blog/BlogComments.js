import React from 'react'
import {Table, Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {useField} from '../../hooks'
import {setNotification} from '../../reducers/notificationReducer'
import {addComment} from '../../reducers/blogsReducer'

const BlogComments = (props) => {
  const [comment, commentReset] = useField('text')

  if (props.blog === undefined) {
    return null
  }

  const notify = (notification, type) => {
    props.setNotification({notification, type}, 5)
  }

  const commentBlog = async (event) => {
    event.preventDefault()
    const commentObject = {comment: comment.value, id: props.blog.id}
    props.addComment(commentObject)
    notify(`Blog ${ props.blog.title } by ${ props.blog.author } commented!`)
    commentReset()
  }

  return (
    <div>
      <Form onSubmit={ commentBlog }>
        <Form.Field>
          <input { ...comment }/>
        </Form.Field>
        <Button
          color='blue'
          type='submit'
        >
          Comment
        </Button>
      </Form>
      <br/>

      <Table striped attached>
       <Table.Body>
          { props.blog.comments.map((comment, index) =>
            <Table.Row key={ index }>
              <Table.Cell>
                { comment.comment }
              </Table.Cell>
            </Table.Row>
          ) }
        </Table.Body>
      </Table>
    </div>
  )
}

const mapDispatchToProps = {
  addComment,
  setNotification
}

export default connect(null, mapDispatchToProps)(BlogComments)
