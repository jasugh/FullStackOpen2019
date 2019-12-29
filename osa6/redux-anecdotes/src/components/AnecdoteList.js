import React from 'react';
import {connect} from 'react-redux'
import {vote} from "../reducers/anecdoteReducer";
import {showNotification} from "../reducers/notificationReducer";

function AnecdoteList(props) {

  const voteAnecdote = (anecdote) => {
    props.vote(anecdote)
    props.showNotification(`You voted anecdote: '${anecdote.content}'`, 5)
  }

  return (
    <div>
      { props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = ({anecdotes, filter}) => {
  return filter.filter.length > 0
    ? anecdotes.filter(c => c.content.toLowerCase().includes(filter.filter.toLowerCase()))
    : anecdotes
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
    filter: state.filter.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  showNotification,
  vote
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)