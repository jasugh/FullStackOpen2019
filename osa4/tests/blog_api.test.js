const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe.skip('blogien haku', () => {
  test('4.8 oikea määrä blogeja json muodossa', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('4.9 blogi id', async () => {
    const allBlogs = await api.get('/api/blogs/')

    expect(allBlogs.body[0].id).toBeDefined()
  })

})

describe.skip('blogin lisäys', () => {
  test('4.10 validi blogi voidaan lisätä', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('4.11 blogi ja tyhjä likes', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: '',
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(addedBlog.body.likes).toBe(0)
  })

  test('4.12 lisätään blogi jossa tyhjä title ja url', async () => {
    const newBlog = {
      title: '',
      author: 'Michael Chan',
      url: '',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe.skip('blogin poisto', () => {
  test('4.13 yksittäisen blogin poisto', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('blogin muutos', () => {
  test('4.14 yksittäisen blogin muutos', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToChange = blogsAtStart[0]
    blogToChange.likes = blogToChange.likes + 1

    const resultBlog = await api
      .put(`/api/blogs/${blogToChange.id}`)
      .send(blogToChange)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.likes).toEqual(blogToChange.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})