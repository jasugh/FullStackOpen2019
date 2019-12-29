import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, content)
  return response.data
}

const vote = async (anecdote) => {
  const votedAnecdote = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: anecdote.id
  }

  const response = await axios.put(`${url}/${anecdote.id}`, votedAnecdote)
  return response.data
}
export default { getAll, createNew, vote }