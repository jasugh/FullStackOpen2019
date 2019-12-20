import React, {useState} from 'react'

const Blog = ({blog, handleLike, handleDelete, user}) => {
  const [lineHide, setLineHide] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleHide = () => {
    setLineHide(!lineHide)
  };

  if (lineHide) {
    return (
        <div   style={ blogStyle } onClick={ toggleHide } className='lineHided'>
          { blog.title } by { blog.author }
        </div>
    )
  }

  return (
    <div style={ blogStyle }>
      <div onClick={ toggleHide }>
        { blog.title } by { blog.author }
      </div>
      <div hidden={ lineHide }>
        <div>
          <div>
            { blog.url }
          </div>
          <div>
            { blog.likes }
            <button onClick={ () => handleLike(blog.id) }>like</button>
          </div>
          <div>
            Added by { blog.user.name }
          </div>
          <button hidden={ user.username !== blog.user.username } onClick={ () => handleDelete(blog.id) }>remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog