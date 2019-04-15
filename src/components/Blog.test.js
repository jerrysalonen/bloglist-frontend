import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('content is rendered before click', () => {

  const blog = {
    title: 'Test Title',
    author: 'Test McTest',
    url: 'http://test.com',
    likes: 300,
    user: {
      name: 'kalle'
    }
  }

  it('title', () => {
    const component = render (
      <Blog blog = {blog} />
    )

    expect(component.container).toHaveTextContent('Test Title')
  })

  it('author', () => {
    const component = render (
      <Blog blog = {blog} />
    )

    expect(component.container).toHaveTextContent('Test McTest')
  })

  it('url is hidden', () => {
    const component = render (
      <Blog blog = {blog} />
    )

    expect(component.container).not.toHaveTextContent('300')
  })
})

describe('content is rendered after click', () => {

  const blog = {
    title: 'Test Title',
    author: 'Test McTest',
    url: 'http://test.com',
    likes: 300,
    user: {
      name: 'kalle'
    }
  }

  it('title', () => {
    const component = render (
      <Blog blog = {blog} />
    )
    const btn = component.container.querySelector('.list-group-item')
    fireEvent.click(btn)

    expect(component.container).toHaveTextContent('Test Title')
  })

  it('author', () => {
    const component = render (
      <Blog blog = {blog} />
    )
    const btn = component.container.querySelector('.list-group-item')
    fireEvent.click(btn)

    expect(component.container).toHaveTextContent('Test McTest')
  })

  it('url', () => {
    const component = render (
      <Blog blog = {blog} />
    )
    const btn = component.container.querySelector('.list-group-item')
    fireEvent.click(btn)

    expect(component.container).toHaveTextContent('http://test.com')
  })

  it('likes', () => {
    const component = render (
      <Blog blog = {blog} />
    )
    const btn = component.container.querySelector('.list-group-item')
    fireEvent.click(btn)

    expect(component.container).toHaveTextContent('300')
  })
})