import React from 'react'

const BlogForm = ({addBlog, title, author, url}) => {
  return (
    <form
      onSubmit={ addBlog }
    >
      <div>
        <div>
          Title:
          <input { ...title } />
        </div>
        <div>
          Author:
          <input { ...author } />
        </div>
        Url:
        <input { ...url } />
      </div>
      <div>
        <button
          type="submit"
        >
          create
        </button>
      </div>
    </form>
  )
};
export default BlogForm