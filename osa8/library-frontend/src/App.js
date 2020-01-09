import React, {useState, useEffect} from 'react'
import {gql} from 'apollo-boost'
import {useQuery, useMutation, useSubscription, useApolloClient} from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        id
        title
        published
        genres
        author {
            name
            born
            bookCount
        }
    }
`
const ALL_BOOKS = gql`
    {
        allBooks  
        {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
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
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
const ALL_AUTHORS = gql`
    {
        allAuthors  {
            name
            born
            bookCount
            id
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
            bookCount
        }
    }
`
const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)  {
            value
        }
    }
`
export const ME = gql`
    query me {
        me {
            username
            favoriteGenre
        }
    }
`
const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const lS = localStorage.getItem('phonenumbers-user-token')
    if (lS) {
      setToken(lS)
    }
  }, [])

  const handleError = (error) => {
    setErrorMessage(error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError,
  })

  const logout = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
    // client.resetStore()
  }

  const errorNotification = () => errorMessage &&
    <div style={ {color: 'red'} }>
      { errorMessage }
    </div>

  // if (!token) {
  //   return (
  //     <div>
  //       {errorNotification()}
  //     </div>
  //   )
  // }

  return (
    <div>
      {/*{ errorMessage &&*/ }
      {/*<div style={ {color: 'red'} }>*/ }
      {/*  { errorMessage }*/ }
      {/*</div>*/ }
      {/*}*/ }
      <div>
        <button onClick={ () => setPage('authors') }>authors</button>
        <button onClick={ () => setPage('books') }>books</button>
        <button hidden={ !token } onClick={ () => setPage('add') }>add book</button>
        <button hidden={ token } onClick={ () => setPage('login') }>login</button>
        <button hidden={ !token } onClick={ () => setPage('recommend') }>recommend</button>
        <button hidden={ !token } onClick={ () => {
          logout()
        } }>logout
        </button>
      </div>

      <Authors
        allAuthors={ authors }
        editAuthor={ editAuthor }
        token={ token }
        show={ page === 'authors' }
      />

      <Books
        allBooks={ books }
        show={ page === 'books' }
      />

      <NewBook
        addBook={ addBook }
        setPage={ (page) => setPage(page) }
        show={ page === 'add' }
      />
      <Recommend
        allBooks={ books }
        user={ user }
        show={ page === 'recommend' }
      />
      <LoginForm
        login={ login }
        setToken={ (token) => setToken(token) }
        setPage={ (page) => setPage(page) }
        show={ page === 'login' }
      />
    </div>
  )
}

export default App