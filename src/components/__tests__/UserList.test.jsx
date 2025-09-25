import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { UserList } from '../UserList'

describe('UserList', () => {
  it('renders user list component', () => {
    render(<UserList />)
    expect(screen.getByText('User Management')).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    render(<UserList />)
    expect(screen.getByText('Loading users...')).toBeInTheDocument()
  })

  it('displays users after loading', async () => {
    render(<UserList />)

    await waitFor(
      () => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('renders search input', () => {
    render(<UserList />)
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument()
  })

  it('renders sort dropdown', () => {
    render(<UserList />)
    expect(screen.getByText('Sort by Name')).toBeInTheDocument()
  })
})