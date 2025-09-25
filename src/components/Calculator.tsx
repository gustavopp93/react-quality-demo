import React, { useState } from 'react'
import { divide } from '../utils/helpers'

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  // Code smell: Large function with multiple responsibilities
  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        // Code smell: Using external function for simple operation
        return divide(firstValue, secondValue)
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  // Code smell: Complex event handler
  const handleButtonClick = (value: string) => {
    const numericValue = parseFloat(value)

    if (!isNaN(numericValue)) {
      if (waitingForNewValue) {
        setDisplay(String(numericValue))
        setWaitingForNewValue(false)
      } else {
        setDisplay(display === '0' ? String(numericValue) : display + numericValue)
      }
    } else {
      switch (value) {
        case 'C':
          setDisplay('0')
          setPreviousValue(null)
          setOperation(null)
          setWaitingForNewValue(false)
          break
        case '±':
          if (display !== '0') {
            const newValue = parseFloat(display) * -1
            setDisplay(String(newValue))
          }
          break
        case '%':
          const percentValue = parseFloat(display) / 100
          setDisplay(String(percentValue))
          break
        case '.':
          if (waitingForNewValue) {
            setDisplay('0.')
            setWaitingForNewValue(false)
          } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.')
          }
          break
        case '=':
          if (previousValue !== null && operation) {
            const currentValue = parseFloat(display)
            const result = calculate(previousValue, currentValue, operation)

            // Code smell: No error handling for division by zero
            setDisplay(String(result))
            setPreviousValue(null)
            setOperation(null)
            setWaitingForNewValue(true)
          }
          break
        case '+':
        case '-':
        case '*':
        case '/':
          const currentDisplayValue = parseFloat(display)

          if (previousValue === null) {
            setPreviousValue(currentDisplayValue)
          } else if (operation) {
            const currentValue = parseFloat(display)
            const result = calculate(previousValue, currentValue, operation)
            setDisplay(String(result))
            setPreviousValue(result)
          }

          setWaitingForNewValue(true)
          setOperation(value)
          break
        default:
          break
      }
    }
  }

  // Code smell: Inline styles for complex styling
  const buttonStyle = {
    width: '70px',
    height: '70px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '8px',
    margin: '5px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }

  const operatorButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#667eea',
    color: 'white'
  }

  const specialButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#a0a0a0',
    color: 'white'
  }

  // Code smell: Hardcoded button layout
  const buttons = [
    [{ label: 'C', style: specialButtonStyle }, { label: '±', style: specialButtonStyle }, { label: '%', style: specialButtonStyle }, { label: '/', style: operatorButtonStyle }],
    [{ label: '7', style: buttonStyle }, { label: '8', style: buttonStyle }, { label: '9', style: buttonStyle }, { label: '*', style: operatorButtonStyle }],
    [{ label: '4', style: buttonStyle }, { label: '5', style: buttonStyle }, { label: '6', style: buttonStyle }, { label: '-', style: operatorButtonStyle }],
    [{ label: '1', style: buttonStyle }, { label: '2', style: buttonStyle }, { label: '3', style: buttonStyle }, { label: '+', style: operatorButtonStyle }],
    [{ label: '0', style: { ...buttonStyle, width: '150px' } }, { label: '.', style: buttonStyle }, { label: '=', style: operatorButtonStyle }]
  ]

  return (
    <div className="card">
      <h2>Calculator</h2>

      <div style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '20px',
        textAlign: 'right',
        fontSize: '36px',
        fontFamily: 'monospace',
        borderRadius: '8px',
        marginBottom: '20px',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        {display}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((button, buttonIndex) => (
              <button
                key={buttonIndex}
                style={button.style}
                onClick={() => handleButtonClick(button.label)}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {button.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Code smell: Debug information in production */}
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
        Debug: prev={previousValue}, op={operation}, waiting={waitingForNewValue ? 'true' : 'false'}
      </div>
    </div>
  )
}