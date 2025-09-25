import React, { useState, useEffect } from 'react'
import { UserList } from './components/UserList'
import { Calculator } from './components/Calculator'
import { TodoApp } from './components/TodoApp'
import { WeatherWidget } from './components/WeatherWidget'
import { ProductCatalog } from './components/ProductCatalog'

function App() {
  const [currentTab, setCurrentTab] = useState('users')

  // Code smell: Unnecessary state updates
  const [count, setCount] = useState(0)
  const [unused, setUnused] = useState('')

  // Code smell: useEffect without dependencies
  useEffect(() => {
    console.log('App rendered')
  })

  // Code smell: Complex conditional rendering
  const renderContent = () => {
    if (currentTab === 'users') {
      return <UserList />
    } else if (currentTab === 'calculator') {
      return <Calculator />
    } else if (currentTab === 'todos') {
      return <TodoApp />
    } else if (currentTab === 'weather') {
      return <WeatherWidget />
    } else if (currentTab === 'products') {
      return <ProductCatalog />
    } else {
      return <div>Page not found</div>
    }
  }

  // Code smell: Inline styles
  const tabStyle = {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#667eea',
    color: 'white'
  }

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: '#5a67d8',
    fontWeight: 'bold'
  }

  return (
    <div>
      <div className="header">
        <h1>React Quality Demo</h1>
        <p>Demo project for Quality Management Course</p>
      </div>

      <div className="container">
        <div style={{ marginBottom: '20px' }}>
          <button
            style={currentTab === 'users' ? activeTabStyle : tabStyle}
            onClick={() => setCurrentTab('users')}
          >
            Users
          </button>
          <button
            style={currentTab === 'calculator' ? activeTabStyle : tabStyle}
            onClick={() => setCurrentTab('calculator')}
          >
            Calculator
          </button>
          <button
            style={currentTab === 'todos' ? activeTabStyle : tabStyle}
            onClick={() => setCurrentTab('todos')}
          >
            Todos
          </button>
          <button
            style={currentTab === 'weather' ? activeTabStyle : tabStyle}
            onClick={() => setCurrentTab('weather')}
          >
            Weather
          </button>
          <button
            style={currentTab === 'products' ? activeTabStyle : tabStyle}
            onClick={() => setCurrentTab('products')}
          >
            Products
          </button>
        </div>

        {renderContent()}

        {/* Code smell: Dead code */}
        <div style={{ display: 'none' }}>
          <p>This is hidden content that should be removed</p>
          <button onClick={() => setCount(count + 1)}>
            Unused counter: {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App