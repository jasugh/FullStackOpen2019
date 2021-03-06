import React, {useState} from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (props.allBooks.loading) {
    return <div>loading...</div>
  }

  const selectGenre = (event) => {
    setGenre(event.target.value)
  }

  const bookRows = () => {
    let booksToShow = props.allBooks.data.allBooks

    if (genre && genre !== 'all genres') {
      let ge = []
      for (let i = 0; i < booksToShow.length; i++) {
        for (let ii = 0; ii < booksToShow[i].genres.length; ii++) {
          if (booksToShow[i].genres[ii] === genre) {
            ge.push(booksToShow[i])
          }
        }
      }
      booksToShow = ge
    }

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

  const getGenres = () => {
    let g = ['all genres']
    props.allBooks.data.allBooks.map(book => book.genres.map(genre => g.push(genre)))
    const set = new Set(g)
    const genresToShow = [...set]

    return (
      <div>
        { genresToShow.map(g =>
          <button key={ g } onClick={ selectGenre } value={ g }>{ g }</button>
        ) }
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
        <tr>
          <th>in genre {genre}</th>
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
      { getGenres() }
    </div>
  )
}

export default Books