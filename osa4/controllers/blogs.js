const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: decodedToken.id
    })

    const savedBlog = await blog.save()
    await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {

  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (decodedToken.id.toString() !== blog.user.toString()) {
      return response.status(401).json({ error: 'user not allowed to delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const likes = body.likes

  // const blog = {
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes,
  //   user: body.user.id,
  //   comments: body.comments
  // }


  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: likes }, { new: true })
      .populate('user', { username: 1, name: 1 })
      .populate('comments', { comment: 1 })

    response.json(updatedBlog.toJSON())

  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/comment/:id', async (request, response, next) => {
  const body = request.body

  try {
    const newComment = new Comment({
      comment: body.comment,
    })

    //add comment
    const savedComment = await newComment.save()

    //add comment _id to blog
    let blog = await Blog.findById(request.params.id)
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    blog = await Blog.findById(request.params.id)
      .populate('user', { username: 1, name: 1 })
      .populate('comments', { comment: 1 })

    response.json(blog.toJSON())

  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter