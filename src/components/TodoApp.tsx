import React, { useState, useEffect } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
  priority: 'low' | 'medium' | 'high'
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  // Code smell: useEffect for localStorage without error handling
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos)
        setTodos(parsed)
      } catch (e) {
        console.log('Error parsing todos from localStorage')
      }
    }
  }, [])

  // Code smell: useEffect with missing dependencies
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Code smell: Function with too many responsibilities
  const addTodo = () => {
    if (inputValue.trim() === '') return

    const newTodo: Todo = {
      id: Date.now(), // Code smell: Using timestamp as ID
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date(),
      priority: priority
    }

    setTodos([...todos, newTodo])
    setInputValue('')

    // Code smell: Console.log in production code
    console.log('Added todo:', newTodo)
  }

  // Code smell: Mutation of state
  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed // Direct mutation
        return todo
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Code smell: Complex filtering logic in render
  const getFilteredTodos = () => {
    let filtered = todos

    if (filter === 'active') {
      filtered = todos.filter(todo => !todo.completed)
    } else if (filter === 'completed') {
      filtered = todos.filter(todo => todo.completed)
    }

    // Code smell: Inefficient sorting
    return filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const aPriority = priorityOrder[a.priority]
      const bPriority = priorityOrder[b.priority]

      if (aPriority !== bPriority) {
        return bPriority - aPriority
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  // Code smell: Inline event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  const filteredTodos = getFilteredTodos()

  // Code smell: Complex render with nested ternary operators
  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? '#ff6b6b' :
           priority === 'medium' ? '#4ecdc4' :
           '#95e1d3'
  }

  const getStatsText = () => {
    const total = todos.length
    const completed = todos.filter(t => t.completed).length
    const remaining = total - completed

    return `Total: ${total}, Completed: ${completed}, Remaining: ${remaining}`
  }

  return (
    <div className="card">
      <h2>Todo List</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          className="input"
          style={{ marginRight: '10px', width: '300px' }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="input"
          style={{ marginRight: '10px' }}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button onClick={addTodo} className="button">
          Add Todo
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => handleFilterChange('all')}
          className="button"
          style={{
            backgroundColor: filter === 'all' ? '#5a67d8' : '#667eea'
          }}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('active')}
          className="button"
          style={{
            backgroundColor: filter === 'active' ? '#5a67d8' : '#667eea'
          }}
        >
          Active
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className="button"
          style={{
            backgroundColor: filter === 'completed' ? '#5a67d8' : '#667eea'
          }}
        >
          Completed
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
          {filter === 'all' ? 'No todos yet' :
           filter === 'active' ? 'No active todos' :
           'No completed todos'}
        </p>
      ) : (
        <div>
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '10px',
                backgroundColor: todo.completed ? '#f8f8f8' : 'white',
                borderLeft: `4px solid ${getPriorityColor(todo.priority)}`
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '15px', transform: 'scale(1.2)' }}
              />

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#333',
                    fontSize: '16px',
                    marginBottom: '5px'
                  }}
                >
                  {todo.text}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Priority: {todo.priority} | Created: {new Date(todo.createdAt).toLocaleDateString()}
                </div>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  background: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
        {getStatsText()}
      </div>

      {/* Code smell: Hidden debugging information */}
      <div style={{ display: 'none' }}>
        <pre>{JSON.stringify(todos, null, 2)}</pre>
      </div>
    </div>
  )
}