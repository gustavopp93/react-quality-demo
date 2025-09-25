import React, { useState, useEffect } from 'react'
import { processUserData, calculateUserAge } from '../utils/helpers'

interface User {
  id: number
  name: string
  email: string
  age: number
  active: boolean
  birthDate: string
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')

  // Code smell: useEffect with complex logic
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)

        // Code smell: Hardcoded delay
        setTimeout(async () => {
          // Code smell: Mock data instead of real API call
          const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, active: true, birthDate: '1993-05-15' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, active: true, birthDate: '1998-08-22' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, active: false, birthDate: '1988-12-03' },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28, active: true, birthDate: '1995-03-10' },
            { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 42, active: true, birthDate: '1981-07-18' },
          ]

          setUsers(mockUsers)
          setLoading(false)
        }, 2000)

      } catch (err) {
        // Code smell: Poor error handling
        setError('Failed to fetch users')
        setLoading(false)
      }
    }

    fetchUsers()
  }, []) // Missing dependencies

  // Code smell: Unnecessary state updates in render
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  useEffect(() => {
    const filters = searchTerm ? { name: searchTerm } : null
    const processed = processUserData(users, filters, sortBy, true, false, false)
    setFilteredUsers(processed)
  }, [users, searchTerm, sortBy])

  // Code smell: Inline event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  // Code smell: Duplicate date formatting functions
  const formatUserBirthDate = (birthDate: string) => {
    return new Date(birthDate).toLocaleDateString()
  }

  const formatBirthDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const getUserBirthDateFormatted = (birthDate: string) => {
    if (!birthDate) return 'N/A'
    return new Date(birthDate).toLocaleDateString()
  }

  // Code smell: Duplicate status formatting
  const formatUserStatus = (isActive: boolean) => {
    return isActive ? 'Active' : 'Inactive'
  }

  const getUserStatusText = (active: boolean) => {
    if (active) return 'Active'
    return 'Inactive'
  }

  const getStatusDisplay = (userActive: boolean) => {
    return userActive === true ? 'Active' : 'Inactive'
  }

  // Code smell: Duplicate email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateEmailAddress = (emailAddress: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(emailAddress)
  }

  const checkEmailFormat = (email: string) => {
    if (!email) return false
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Code smell: Complex render function with nested conditions
  const renderUserRow = (user: User, index: number) => {
    return (
      <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.id}</td>
        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
          {user.name ? user.name : 'N/A'}
        </td>
        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.age}</td>
        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
          <span style={{
            color: user.active ? 'green' : 'red',
            fontWeight: user.active ? 'bold' : 'normal'
          }}>
            {user.active ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
          {new Date(user.birthDate).toLocaleDateString()}
        </td>
      </tr>
    )
  }

  // Code smell: Multiple return statements
  if (loading) {
    return (
      <div className="card">
        <h2>Users</h2>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          Loading users...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <h2>Users</h2>
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>User Management</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input"
          style={{ marginRight: '10px' }}
        />

        <select value={sortBy} onChange={handleSortChange} className="input">
          <option value="name">Sort by Name</option>
          <option value="age">Sort by Age</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Birth Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => renderUserRow(user, index))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        Total users: {filteredUsers.length}
      </div>
    </div>
  )
}