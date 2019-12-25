import React from 'react';
import {newAnecdote} from "../reducers/anecdoteReducer";
import {showNotification} from "../reducers/notificationReducer"

function AnecdoteForm(props) {

  const addAnecdote = (event)=> {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.store.dispatch(
      newAnecdote(anecdote)
    )
    props.store.dispatch(showNotification(`Anecdote ${anecdote} added`))
    setTimeout(() => {
      props.store.dispatch(showNotification(null))
    }, 5000);
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
