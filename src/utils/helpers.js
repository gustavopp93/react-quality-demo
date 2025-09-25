import _ from 'lodash'

// Code smell: Overly complex function with too many responsibilities
export function processUserData(users, filters, sortBy, includeInactive, formatDates, calculateAge) {
  let result = users

  // Code smell: Deep nesting
  if (filters) {
    if (filters.name) {
      if (filters.name.length > 0) {
        result = result.filter(user => {
          if (user.name) {
            if (user.name.toLowerCase) {
              return user.name.toLowerCase().includes(filters.name.toLowerCase())
            }
          }
          return false
        })
      }
    }

    if (filters.age) {
      if (filters.age.min !== undefined && filters.age.max !== undefined) {
        result = result.filter(user => {
          const age = calculateAge ? calculateUserAge(user.birthDate) : user.age
          return age >= filters.age.min && age <= filters.age.max
        })
      }
    }
  }

  // Code smell: Inconsistent null checks
  if (!includeInactive) {
    result = result.filter(user => user.active === true)
  }

  // Code smell: Magic numbers
  if (result.length > 100) {
    result = result.slice(0, 100)
  }

  // Code smell: Complex sorting logic
  if (sortBy) {
    if (sortBy === 'name') {
      result = result.sort((a, b) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name)
        } else if (a.name) {
          return -1
        } else if (b.name) {
          return 1
        } else {
          return 0
        }
      })
    } else if (sortBy === 'age') {
      result = result.sort((a, b) => {
        const ageA = calculateAge ? calculateUserAge(a.birthDate) : a.age
        const ageB = calculateAge ? calculateUserAge(b.birthDate) : b.age
        return ageA - ageB
      })
    }
  }

  // Code smell: Mutation of input data
  if (formatDates) {
    result.forEach(user => {
      if (user.birthDate) {
        user.formattedBirthDate = new Date(user.birthDate).toLocaleDateString()
      }
    })
  }

  return result
}

// Code smell: Function does too many things
export function calculateUserAge(birthDate) {
  if (!birthDate) return 0

  const today = new Date()
  const birth = new Date(birthDate)

  // Code smell: No error handling
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

// Code smell: Unused function
export function unusedHelper() {
  console.log('This function is never called')
  return 'unused'
}

// Code smell: Poor error handling
export function fetchDataFromAPI(url) {
  try {
    return fetch(url).then(response => response.json())
  } catch (error) {
    console.log('Error occurred')
    return null
  }
}

// Code smell: Duplicate code
export function formatUserName(user) {
  if (user.firstName && user.lastName) {
    return user.firstName + ' ' + user.lastName
  }
  return 'Unknown User'
}

export function formatCustomerName(customer) {
  if (customer.firstName && customer.lastName) {
    return customer.firstName + ' ' + customer.lastName
  }
  return 'Unknown Customer'
}

// Code smell: Using lodash for simple operations
export function simpleArrayOperation(arr) {
  return _.map(arr, item => _.upperCase(item))
}

// Code smell: No input validation
export function divide(a, b) {
  return a / b
}

// Code smell: Hardcoded values
export function getAPIEndpoint(resource) {
  const baseUrl = 'https://api.example.com/v1/'
  return baseUrl + resource
}

// Code smell: More duplicate functions
export function formatPersonName(person) {
  if (person.firstName && person.lastName) {
    return person.firstName + ' ' + person.lastName
  }
  return 'Unknown Person'
}

export function getFullName(individual) {
  if (individual.firstName && individual.lastName) {
    return individual.firstName + ' ' + individual.lastName
  }
  return 'Unknown Individual'
}

// Code smell: Duplicate date utilities
export function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

export function getFormattedDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

export function displayDate(dateInput) {
  if (!dateInput) return 'N/A'
  return new Date(dateInput).toLocaleDateString()
}

// Code smell: More duplicate math operations
export function add(a, b) {
  return a + b
}

export function sum(x, y) {
  return x + y
}

export function plus(num1, num2) {
  return num1 + num2
}

export function multiply(a, b) {
  return a * b
}

export function times(x, y) {
  return x * y
}

// Code smell: Duplicate string utilities
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function capitalizeFirst(text) {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function makeFirstLetterUppercase(string) {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}