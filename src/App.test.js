import React from 'react'
import { render, waitForElement, act } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged in, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(() => component.getByText('Login'))

    expect(component.container).not.toHaveTextContent('React patterns')
    expect(component.container).not.toHaveTextContent('TDD harms')
  })

  it('if user is logged in, notes are shown', async () => {
    const user = {
      username: 'testUser',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpMjIiLCJpZCI6IjVjYWNjYjA1NTZlNTgxMmRiOGM3MmMyOSIsImlhdCI6MTU1NTMyMjgxNn0.UWZESYQDsAEpM7cbyuyh9LPy7ZJT553Df4-hnBjQr4I',
      name: 'Test User'
    }

    window.localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(() => component.getByText('Test User logged in.'))

    expect(component.container).toHaveTextContent('React patterns')
    expect(component.container).toHaveTextContent('TDD harms')
  })

})