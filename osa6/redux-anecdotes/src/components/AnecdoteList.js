import React from 'react';
import {vote} from "../reducers/anecdoteReducer";
import {showNotification} from "../reducers/notificationReducer";

function AnecdoteList(props) {
  const {anecdotes} = props.store.getState()

  const voteAnecdote = (id) => {
    props.store.dispatch(
      vote(id)
    )
    props.store.dispatch(showNotification(`You voted anecdote ${id}`))
    setTimeout(() => {
      props.store.dispatch(showNotification(null))
    }, 5000);
  }

  return (
    <div>
      { anecdotes.map(anecdote =>
        <div key={ anecdote.id }>
          <div>
            { anecdote.id }
          </div>
          <div>
            { anecdote.content }
          </div>
          <div>
            has { anecdote.votes }
            <button onClick={ () => voteAnecdote(anecdote.id) }>vote</button>
          </div>
        </div>
      ) }
    </div>
  );
}

export default AnecdoteList;