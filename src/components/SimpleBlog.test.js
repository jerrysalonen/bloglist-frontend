import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('content is rendered', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test McTest',
    likes: 300
  }

  test('title', () => {

    const component = render(
      <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent('Test Title')
  })

  test('author', () => {

    const component = render(
      <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent('Test McTest')
  })

  test('likes', () => {

    const component = render(
      <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent('300')
  })
})

describe('button', async () => {

  const blog = {
    title: 'Test Title',
    author: 'Test McTest',
    likes: 300
  }

  it('button is clicked two times', () => {
    const mockHandler = jest.fn()

    const { getByText } = render (
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const btn = getByText('like')
    fireEvent.click(btn)
    fireEvent.click(btn)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})