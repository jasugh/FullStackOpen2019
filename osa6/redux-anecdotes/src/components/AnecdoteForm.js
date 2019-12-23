import React from 'react';
import {newAnecdote} from "../reducers/anecdoteReducer";

function AnecdoteForm(props) {

  const addAnecdote = (event)=> {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.store.dispatch(
      newAnecdote(anecdote)
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ addAnecdote }>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
