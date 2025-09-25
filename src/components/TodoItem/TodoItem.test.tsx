import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoItem } from './TodoItem'
import { Todo } from '../../types/todo'

describe('TodoItem', () => {
  const mockToggle = jest.fn()
  const mockDelete = jest.fn()
  const todo: Todo = {
    id: '1',
    title: 'Test todo',
    completed: false,
    createdAt: '2023-01-01T00:00:00.000Z',
    completedAt: null,
    order: 0,
  }

  beforeEach(() => {
    mockToggle.mockClear()
    mockDelete.mockClear()
  })

  it('renders todo title and checkbox', () => {
    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)
    expect(screen.getByText('Test todo')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('calls onToggle when checkbox clicked', async () => {
    const user = userEvent.setup()
    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(mockToggle).toHaveBeenCalledWith('1')
  })

  it('calls onDelete when delete button clicked', async () => {
    const user = userEvent.setup()
    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)
    const deleteButton = screen.getByRole('button', { name: 'Delete todo' })
    await user.click(deleteButton)
    expect(mockDelete).toHaveBeenCalledWith('1')
  })

  it('strikes through text when completed', () => {
    const completedTodo: Todo = {
      ...todo,
      completed: true,
      completedAt: '2023-01-02T00:00:00.000Z',
    }
    render(<TodoItem todo={completedTodo} onToggle={mockToggle} onDelete={mockDelete} />)
    const text = screen.getByText('Test todo')
    expect(text).toHaveClass('completed')
  })

  it('renders description when provided', () => {
    const todoWithDescription: Todo = {
      ...todo,
      description: 'Test description',
    }
    render(<TodoItem todo={todoWithDescription} onToggle={mockToggle} onDelete={mockDelete} />)
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders metadata with creation date', () => {
    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)
    expect(screen.getByText(/Created: 12\/31\/2022/)).toBeInTheDocument()
  })
})
