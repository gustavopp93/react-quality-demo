import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Calculator } from '../Calculator'

describe('Calculator', () => {
  it('renders calculator component', () => {
    render(<Calculator />)
    expect(screen.getByText('Calculator')).toBeInTheDocument()
  })

  it('displays initial value of 0', () => {
    render(<Calculator />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('handles number button clicks', () => {
    render(<Calculator />)

    const button5 = screen.getByText('5')
    fireEvent.click(button5)

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('handles clear button', () => {
    render(<Calculator />)

    const button5 = screen.getByText('5')
    const clearButton = screen.getByText('C')

    fireEvent.click(button5)
    fireEvent.click(clearButton)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('performs basic addition', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('='))

    expect(screen.getByText('5')).toBeInTheDocument()
  })
})