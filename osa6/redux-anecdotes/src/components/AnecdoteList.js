import React from 'react';
import {vote} from "../reducers/anecdoteReducer";
import {showNotification} from "../reducers/notificationReducer";

function AnecdoteList(props) {
  const {anecdotes} = props.store.getState()
  const {filter} = props.store.getState().filter

  const voteAnecdote = (anecdote) => {
    props.store.dispatch(
      vote(anecdote)
    )
    props.store.dispatch(showNotification(`You voted anecdote: ${ anecdote.content }`))
    setTimeout(() => {
      props.store.dispatch(showNotification(null))
    }, 5000);
  }

  const anecdotesToShow = filter.length > 0
    ? anecdotes.filter(c => c.content.toLowerCase().includes(filter.toLowerCase()))
    : anecdotes

  return (
    <div>
      { anecdotesToShow.map(anecdote =>
        <div key={ anecdote.id }>
          <div>
            { anecdote.content }
          </div>
          <div>
            has { anecdote.votes }
            <button onClick={ () => voteAnecdote(anecdote) }>vote</button>
          </div>
        </div>
      ) }
    </div>
  );
}

export default AnecdoteList;