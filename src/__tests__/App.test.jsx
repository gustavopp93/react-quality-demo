import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders main heading', () => {
    render(<App />)
    expect(screen.getByText('React Quality Demo')).toBeInTheDocument()
  })

  it('renders navigation tabs', () => {
    render(<App />)
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Calculator')).toBeInTheDocument()
    expect(screen.getByText('Todos')).toBeInTheDocument()
  })

  it('switches to calculator tab', () => {
    render(<App />)

    const calculatorTab = screen.getByText('Calculator')
    fireEvent.click(calculatorTab)

    expect(screen.getByText('Calculator')).toBeInTheDocument()
  })

  it('switches to todos tab', () => {
    render(<App />)

    const todosTab = screen.getByText('Todos')
    fireEvent.click(todosTab)

    expect(screen.getByText('Todo List')).toBeInTheDocument()
  })

  it('displays users tab by default', () => {
    render(<App />)
    expect(screen.getByText('User Management')).toBeInTheDocument()
  })
})