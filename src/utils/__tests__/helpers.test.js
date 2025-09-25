import {
  calculateUserAge,
  divide,
  formatUserName,
  simpleArrayOperation
} from '../helpers'

describe('helpers', () => {
  describe('calculateUserAge', () => {
    it('calculates age correctly for valid birth date', () => {
      const birthDate = '1990-01-01'
      const age = calculateUserAge(birthDate)
      expect(age).toBeGreaterThan(30)
    })

    it('returns 0 for null birth date', () => {
      expect(calculateUserAge(null)).toBe(0)
    })
  })

  describe('divide', () => {
    it('divides two positive numbers', () => {
      expect(divide(10, 2)).toBe(5)
    })

    it('handles division by zero', () => {
      const result = divide(10, 0)
      expect(result).toBe(Infinity)
    })
  })

  describe('formatUserName', () => {
    it('formats user name with first and last name', () => {
      const user = { firstName: 'John', lastName: 'Doe' }
      expect(formatUserName(user)).toBe('John Doe')
    })
  })

  describe('simpleArrayOperation', () => {
    it('converts array items to uppercase', () => {
      const input = ['hello', 'world']
      const result = simpleArrayOperation(input)
      expect(result).toEqual(['HELLO', 'WORLD'])
    })
  })
})