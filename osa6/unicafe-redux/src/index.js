import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  return (
    <div>
      <button onClick={good}>hyvä</button>
      <div>hyvä {store.getState().good}</div>

      <button  onClick={ok}>neutraali</button>
      <div>neutraali {store.getState().ok}</div>

      <button  onClick={bad}>huono</button>
      <div>huono {store.getState().bad}</div>

      <button  onClick={zero}>nollaa tilastot {store.getState().zero}</button>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
