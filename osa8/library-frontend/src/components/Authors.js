import React, {useState} from 'react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (props.allAuthors.loading) {
    return <div>loading...</div>
  }

  const authors = props.allAuthors.data.allAuthors

  const authorNames = () =>  {
    return authors.map(author => <option key={author.id} name={author.name} value={ author.name }>{ author.name }</option>)
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: {name, born: parseInt(born)}
    })
    setName('')
    setBorn('')
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          { authors.map(a =>
            <tr key={ a.name }>
              <td>{ a.name }</td>
              <td>{ a.born }</td>
              <td>{ a.bookCount }</td>
            </tr>
          ) }
          </tbody>
        </table>
      </div>
      <br/>
      <div>

        <form hidden={!props.token} onSubmit={ submit }>
          <h2>Set birth year</h2>
          <select
            value={ name }
            onChange={ handleChange }
          >
            { authorNames() }
          </select>
          <div>
            born
            <input
              value={ born }
              onChange={ ({target}) => setBorn(target.value) }
            />
          </div>
          <button type='submit'>Update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors