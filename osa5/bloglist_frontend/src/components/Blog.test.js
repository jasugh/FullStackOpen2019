import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent, cleanup} from '@testing-library/react'

import Blog from './Blog'

afterEach(cleanup)

describe('Blog content', () => {
  let component

  test('default content', () => {
    const blog = {
      title: 'blogin otsikko',
      author: 'blogin kirjoittaja',
      url: 'joku@jossain.com',
      likes: 8,
      user: {
        name: 'jukka',
        username: 'käyttäjänimi'
      }
    }

    const user = {
      username: 'jukka'
    }

    const component = render(
      <Blog blog={ blog } user={ user }  />
    )

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('content after clicking a row', () => {
    const blog = {
      title: 'blogin otsikko',
      author: 'blogin kirjoittaja',
      url: 'joku@jossain.com',
      likes: 8,
      user: {
        name: 'jukka',
        username: 'käyttäjänimi'
      }
    }

    const user = {
      username: 'jukka'
    }

    const component = render(
      <Blog blog={ blog } user={ user }  />
    )

    const click = component.container.querySelector('.lineHided')
    fireEvent.click(click)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

})