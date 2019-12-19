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
    },
    {
      title: "title321654",
      author: "author",
      url: "urlasdfsadfsd",
      likes: 0,
      user: {
        username: "tokauser",
        name: "toinen user",
        id: "5df5347755013932e07b65ec"
      },
      id: "5dfa36db48e1bb4bc8c8d676"
    }
  ]


const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
