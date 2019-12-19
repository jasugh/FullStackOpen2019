var lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max.apply(Math, blogs.map((o) => o.likes))
  const f = blogs.find((o) => o.likes === maxLikes)
  return {
    title: f.title,
    author: f.author,
    likes: f.likes
  }
}

const mostBlogs = (blogs) => {
  let counts = []

  for (let i = 0; i < blogs.length; i++) {
    let index = lodash.findIndex(counts, function (o) {
      return o.author === blogs[i].author
    })
    if (index === -1) {
      counts.push({ author: blogs[i].author, count: 1 })
    } else {
      counts[index].count = counts[index].count + 1
    }
  }
  const sorted = lodash.sortBy(counts, ['count']).reverse()

  return {
    author: sorted[0].author,
    blogs: sorted[0].count
  }
}

const mostLikes = (blogs) => {
  let likeCount = []

  for (let i = 0; i < blogs.length; i++) {
    let index = lodash.findIndex(likeCount, function (o) {
      return o.author === blogs[i].author
    })
    if (index === -1) {
      likeCount.push({ author: blogs[i].author, likes: blogs[i].likes })
    } else {
      likeCount[index].likes = likeCount[index].likes + blogs[i].likes
    }
  }
  const sorted = lodash.sortBy(likeCount, ['likes']).reverse()

  return {
    author: sorted[0].author,
    likes: sorted[0].likes
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}