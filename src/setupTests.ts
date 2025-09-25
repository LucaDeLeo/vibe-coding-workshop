import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder as any
global.TextDecoder = TextDecoder as any

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock crypto.randomUUID for tests
let uuidCounter = 0
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => {
      uuidCounter++
      return `12345678-1234-1234-1234-1234567890${String(uuidCounter).padStart(2, '0')}`
    },
  },
})
