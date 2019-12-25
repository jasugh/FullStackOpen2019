import React from 'react'
import {filter} from "../reducers/filterReducer";

const Filter = (props) => {

  const handleAnecdoteSearch = (event) => {
    props.store.dispatch(
      filter(event.target.value)
    )
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input
        onChange={handleAnecdoteSearch}
      />
    </div>
  )
}

export default Filter