import React  from 'react'

const Recommend = (props) => {
  if (!props.show) {
    return null
  }

  if (props.allBooks.loading) {
    return <div>loading...</div>
  }

  if (props.user.loading) {
    return <div>loading...</div>
  }
  const user = props.user.data.me

  const bookRows = () => {
    let booksToShow = props.allBooks.data.allBooks

      let ge = []
      for (let i = 0; i < booksToShow.length; i++) {
        for (let ii = 0; ii < booksToShow[i].genres.length; ii++) {
          if (booksToShow[i].genres[ii] === user.favoriteGenre) {
            ge.push(booksToShow[i])
          }
        }
      }
      booksToShow = ge

    return (
      booksToShow.map(book =>
        <tr key={ book.title }>
          <td>{ book.title }</td>
          <td>{ book.author.name }</td>
          <td>{ book.published }</td>
        </tr>
      )
    )
  }


  return (
    <div>
      <h2>recommendations</h2>
      <h3>books in your favorite genre: {user.favoriteGenre}</h3>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        { bookRows() }
        </tbody>
      </table>
      <br/>
    </div>
  )
}

export default Recommend