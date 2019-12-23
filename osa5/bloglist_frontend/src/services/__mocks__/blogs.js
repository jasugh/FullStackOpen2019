const blogs = [
    {
      title: "ekauser blogi",
      author: "uuseri eka",
      url: "urliaaaaaaaaaaaa",
      likes: 6,
      user: {
        username: "ekauser",
        name: "ensimmäinen user",
        id: "5df51a5d15502c3490088df1"
      },
      id: "5df942283fafa41df8677a1e"
    },
    {
      title: "kolmas ekauser",
      author: "author eka",
      url: "lllllllllllllllllllllllllll",
      likes: 7,
      user: {
        username: "ekauser",
        name: "ensimmäinen user",
        id: "5df51a5d15502c3490088df1"
      },
      id: "5df943f53fafa41df8677a20"
    },
    {
      title: "dsfafdsfdsds",
      author: "sdafsdfadsfdfs",
      url: "sdfdsfdsfasdfa",
      likes: 2,
      user: {
        username: "ekauser",
        name: "ensimmäinen user",
        id: "5df51a5d15502c3490088df1"
      },
      id: "5df94a692e60af4c4852c5ca"
    },
    {
      title: "tiitle llllllllllllllllllllll",
      author: "Author",
      url: "url321654987",
      likes: 5,
      user: {
        username: "ekauser",
        name: "ensimmäinen user",
        id: "5df51a5d15502c3490088df1"
      },
      id: "5dfa360548e1bb4bc8c8d675"
    }
  ]

const getAll = () => {
  return Promise.resolve(blogs)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }
