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
          <input
            name="title"
            { ...title }/>
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input
            name="author"
            { ...author }/>
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <input
            name="url"
            { ...url }/>
        </Form.Field>
        <Button
          cy-name="create"
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