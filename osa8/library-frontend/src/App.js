import React, {useState} from 'react'
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from '@apollo/react-hooks'


import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
    {
        allAuthors  {
            name
            born
            bookCount
        }
    }
`

const ALL_BOOKS = gql`
    {
        allBooks  {
            title
            published
            author
        }
    }
`

const ADD_BOOK = gql`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres:[String]) {
        addBook  (
            title: $title
            published: $published
            author: $author
            genres: $genres
        )
        {
            title
            published
            author
            genres
        }
    }
`
const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
        editAuthor  (
            name: $name
            setBornTo: $born
        )
        {
            name
            born
        }
    }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = (error) => {
    setErrorMessage(error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  return (
    <div>
      { errorMessage &&
      <div style={ {color: 'red'} }>
        { errorMessage }
      </div>
      }
      <div>
        <button onClick={ () => setPage('authors') }>authors</button>
        <button onClick={ () => setPage('books') }>books</button>
        <button onClick={ () => setPage('add') }>add book</button>
      </div>

      <Authors
        allAuthors={ authors }
        editAuthor={ editAuthor }
        show={ page === 'authors' }
      />

      <Books
        allBooks={ books }
        show={ page === 'books' }
      />

      <NewBook
        addBook={ addBook }
        show={ page === 'add' }
      />

    </div>
  )
}

export default App