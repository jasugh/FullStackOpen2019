import React from 'react'
import {connect} from "react-redux";

import {filter} from "../reducers/filterReducer";

const Filter = (props) => {
  const handleAnecdoteSearch = (event) => {
    props.filter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={ style }>
      filter
      <input
        onChange={ handleAnecdoteSearch }
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  filter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)