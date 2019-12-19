import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent, cleanup} from '@testing-library/react'
import {prettyDOM} from '@testing-library/dom'

import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'otsikko',
    author: 'blog author',
    likes: 8
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={ blog } onClick={mockHandler}/>
  )

  expect(component.container).toHaveTextContent('otsikko')
  expect(component.container).toHaveTextContent('blog author')
  expect(component.container).toHaveTextContent('8')

})

test('clicking the button calls event handler twice', async () => {
  const simpleBlog = {
    title: 'Component testing is done with react-testing-library',
    author: 'kirjailija',
    like: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={simpleBlog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)


  expect(mockHandler.mock.calls.length).toBe(2)
})