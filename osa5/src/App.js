import React, {useState, useEffect} from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useField} from "./hooks/index"

function App() {
  const username = useField('text')
  const password = useField('text')
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null);
  const [messageClass, setMessageClass] = useState(message)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, []);

  const rows = () => {
    const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

    return (
      sortedBlogs.map(blog =>
        <Blog
          key={ blog.id }
          blog={ blog }
          handleLike={ handleLike }
          handleDelete={ handleDelete }
          user={ user }
        />
      ))
  }

  const blogFormRef = React.createRef()

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()

      const newObject = {
        title: title.value,
        author: author.value,
        url: url.value
      };

      const savedBlog = await blogService.create(newObject)

      setMessage(
        `Blog ${ savedBlog.title } added successfully`
      );

      setMessageClass('message');
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setBlogs(blogs.concat(savedBlog));
      title.onReset()
      author.onReset()
      url.onReset()
    } catch (error) {
      setMessage(
        `Blog could not be added ${ error }`
      );
      setMessageClass('error');
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleLike = async (id) => {
    try {
      const blogToLike = await blogs.find(blog => blog.id === id)

      const changeBlog = {
        title: blogToLike.title,
        author: blogToLike.author,
        url: blogToLike.url,
        likes: blogToLike.likes + 1,
        user: blogToLike.user.id
      }

      const changedBlog = await blogService.update(changeBlog, blogToLike.id)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))

      setMessage(
        `Blog ${ changedBlog.title } likes updated successfully`
      );
      setMessageClass('message');
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage(
        `Blog could not be changed ${ exception }`
      );
      setMessageClass('error');
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleDelete = (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id)

    if (window.confirm(`remove blog ${ blogToDelete.title } by ${ blogToDelete.author }`)) {
      blogService
        .remove(id)
        .then(data => {
            setBlogs(blogs.filter(blog => blog.id !== id))

            setMessage(
              `Blog deleted`
            );
            setMessageClass('message');
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
        )
        .catch(error => {
          setMessage(
            `Blog could not be deleted ${ error }`
          );
          setMessageClass('error');
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = {
        username: username.value,
        password: password.value
      }

      await loginService.login(user)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.onReset()
      password.onReset()
    } catch (exception) {
      setMessage(
        `wrong username or password`
      );
      setMessageClass('error');
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = {display: loginVisible ? 'none' : ''}
    const showWhenVisible = {display: loginVisible ? '' : 'none'}

    return (
      <div>
        <div style={ hideWhenVisible }>
          <button onClick={ () => setLoginVisible(true) }>log in</button>
        </div>
        <div style={ showWhenVisible }>
          <LoginForm
            handleLogin={ handleLogin }
            username={ username }
            password={ password }
          />
          <button onClick={ () => setLoginVisible(false) }>cancel</button>
        </div>
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)

  }

  const blogForm = () => (
    <BlogForm
      addBlog={ addBlog }
      title={ title }
      author={ author }
      url={ url }
    />
  )

  return (
    <div>
      <h1>Blog application</h1>

      <Notification message={ message } messageClass={ messageClass }/>

      { user === null ?
        loginForm()
        :
        <div>
          <p>Your are logged in as: { user.name }
            <button onClick={ logout }>logout</button>
          </p>

          <div>
            <Togglable buttonLabel="new blog" ref={ blogFormRef }>
              { blogForm() }
            </Togglable>
          </div>
          <ul>
            { rows() }
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
