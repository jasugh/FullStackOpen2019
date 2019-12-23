import React from 'react'
import {render, waitForElement} from '@testing-library/react'

jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {

  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App/>
    )
    component.rerender(<App/>)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).toHaveTextContent('login')

    const blogs = component.container.querySelectorAll('.lineHided')
    expect(blogs.length).toBe(0)
  })


  test('if user logged, blogs are rendered', async () => {

    const user = {
      username: 'ekauser',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVrYXVzZXIiLCJpZCI6IjVkZjUxYTVkMTU1MDJjMzQ5MDA4OGRmMSIsImlhdCI6MTU3Njg3NDI4Mn0.MJR8iwRiOtxg-0UTG9leO_1JPm0AprdWKQWdikLj4wQ',
      name: 'ensimmäinen user'
    }
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App/>
    )

    await waitForElement(
      () => component.container.querySelector('.lineHided')
    )

    component.rerender(<App/>)
    const blogs = component.container.querySelectorAll('.lineHided')

    expect(blogs.length).toBe(4)
  })
})