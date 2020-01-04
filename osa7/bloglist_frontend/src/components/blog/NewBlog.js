import React from 'react'
import {useField} from '../../hooks'
import {Header, Button, Form} from "semantic-ui-react";

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <Header as='h2'>Create New Blog</Header>

      <Form onSubmit={ handleSubmit }>
        <br/>
        <Form.Field>
          <label>Title</label>
          <input { ...title }/>
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input { ...author }/>
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <input { ...url }/>
        </Form.Field>
        <Button
          color='blue'
          type='submit'
        >
          Create
        </Button>
      </Form>
    </div>
  )
}

export default NewBlog