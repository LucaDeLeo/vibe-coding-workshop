import { render, screen } from '@testing-library/react'
import { TodoList } from './TodoList'
import { Todo } from '../../types/todo'

describe('TodoList', () => {
  it('renders empty state when no todos', () => {
    render(<TodoList todos={[]} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument()
  })

  it('renders todos when provided', () => {
    const todos: Todo[] = [{ id: '1', text: 'Test', completed: false, createdAt: '' }]
    render(<TodoList todos={todos} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
