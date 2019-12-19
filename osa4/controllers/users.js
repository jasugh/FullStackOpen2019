const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.password.length < 3) {
      throw new Error('PasswordTooShort')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.delete('/:username', async (request, response, next) => {
  try {
    await User.findOneAndRemove(
      { username: request.params.username }
    )
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter