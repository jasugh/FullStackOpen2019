import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    case 'LIKE':
      return state = state.map(blog => blog.id === action.data.id ? action.data : blog)
    case 'COMMENT':
      return state = state.map(blog => blog.id === action.data.id ? action.data : blog)
    default:
      return state
  }
}

export const newBlog = (data) => {
  return async dispatch => {
    blogService.create(data)
      .then(newBlog => {
        dispatch({
          type: 'NEW_BLOG',
          data: newBlog
        })
        const notification = {
          "notification": `A new blog ${ newBlog.title } by ${ newBlog.author } added`,
          "type": "success"
        }
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: notification
        })
        setTimeout(() => {
          dispatch({
            type: 'CLEAR_NOTIFICATION',
          })
        }, 5000)
      })
      .catch(error => {
          const notification = {
            "notification": `Blog not added: ${ error.message }`,
            "type": "error"
          }
          dispatch({
            type: 'SET_NOTIFICATION',
            notification: notification
          })
          setTimeout(() => {
            dispatch({
              type: 'CLEAR_NOTIFICATION',
            })
          }, 5000)
        }
      )
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (blog, history) => {
  return async dispatch => {
    await blogService.remove(blog)

    history.push('/')

    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export const likeBlog = (likedBlog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(likedBlog)

    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const addComment = (commentObject) => {
  return async dispatch => {
    const commentedBlog = await blogService.addComment(commentObject)

    dispatch({
      type: 'COMMENT',
      data: commentedBlog
    })
  }
}

export default blogsReducer

