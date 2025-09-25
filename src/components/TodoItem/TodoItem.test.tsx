import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoItem } from './TodoItem'
import { Todo } from '../../types/todo'

describe('TodoItem', () => {
  const mockToggle = jest.fn()
  const mockDelete = jest.fn()
  const todo: Todo = { id: '1', text: 'Test todo', completed: false, createdAt: '' }

  beforeEach(() => {
    mockToggle.mockClear()
    mockDelete.mockClear()
  })

  it('renders todo text and checkbox', () => {
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
    const completedTodo = { ...todo, completed: true }
    render(<TodoItem todo={completedTodo} onToggle={mockToggle} onDelete={mockDelete} />)
    const text = screen.getByText('Test todo')
    expect(text).toHaveClass('completed')
  })
})
