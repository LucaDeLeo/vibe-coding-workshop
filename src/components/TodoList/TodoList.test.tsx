import { render, screen } from '@testing-library/react'
import { TodoList } from './TodoList'
import { Todo } from '../../types/todo'

describe('TodoList', () => {
  it('renders empty state when no todos', () => {
    render(<TodoList todos={[]} filter="all" onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument()
  })

  it('renders todos when provided', () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'Test',
        completed: false,
        createdAt: '2023-01-01T00:00:00.000Z',
        completedAt: null,
        order: 0,
      },
    ]
    render(<TodoList todos={todos} filter="all" onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
