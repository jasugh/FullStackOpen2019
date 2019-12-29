import React from 'react';
import {connect} from "react-redux";

import {newAnecdote} from "../reducers/anecdoteReducer";
import {showNotification} from "../reducers/notificationReducer"

function AnecdoteForm(props) {

  const addAnecdote = async (event) => {
    event.preventDefault()

    const anecdote = {
      content: event.target.anecdote.value,
      votes: 0
    }
    event.target.anecdote.value = ''

    props.newAnecdote(anecdote)
    props.showNotification(`Anecdote ${ anecdote.content } added`,  5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ addAnecdote }>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  newAnecdote,
  showNotification
}

export default connect( mapStateToProps, mapDispatchToProps)(AnecdoteForm)
