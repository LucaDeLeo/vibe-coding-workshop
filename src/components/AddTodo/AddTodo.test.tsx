import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTodo } from './AddTodo'

describe('AddTodo', () => {
  const mockOnAdd = jest.fn()

  beforeEach(() => {
    mockOnAdd.mockClear()
  })

  it('renders input, description textarea, and button', () => {
    render(<AddTodo onAdd={mockOnAdd} />)

    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Add details (optional)')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add todo' })).toBeInTheDocument()
  })

  it('calls onAdd with trimmed title and description when form is submitted', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    const descriptionInput = screen.getByPlaceholderText('Add details (optional)')
    const button = screen.getByRole('button', { name: 'Add todo' })

    await user.type(titleInput, '  Test todo  ')
    await user.type(descriptionInput, '  Test description  ')
    await user.click(button)

    expect(mockOnAdd).toHaveBeenCalledWith('Test todo', '  Test description  ')
    expect(mockOnAdd).toHaveBeenCalledTimes(1)
  })

  it('clears inputs after successful submission', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement
    const descriptionInput = screen.getByPlaceholderText(
      'Add details (optional)'
    ) as HTMLTextAreaElement

    await user.type(titleInput, 'Test todo')
    await user.type(descriptionInput, 'Test description')
    await user.click(screen.getByRole('button', { name: 'Add todo' }))

    expect(titleInput.value).toBe('')
    expect(descriptionInput.value).toBe('')
  })

  it('shows error when trying to add empty todo title', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const button = screen.getByRole('button', { name: 'Add todo' })
    await user.click(button)

    expect(screen.getByText('Please enter a todo title')).toBeInTheDocument()
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('allows typing up to 200 characters in title (validation handled by parent)', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement

    const longText = 'a'.repeat(200)
    await user.type(titleInput, longText)

    // Input should accept up to 200 characters
    expect(titleInput.value).toHaveLength(200)
  })

  it('allows typing up to 1000 characters in description (validation handled by parent)', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const descriptionInput = screen.getByPlaceholderText(
      'Add details (optional)'
    ) as HTMLTextAreaElement

    const longText = 'a'.repeat(1000)
    await user.type(descriptionInput, longText)

    // Input should accept up to 1000 characters
    expect(descriptionInput.value).toHaveLength(1000)
  })

  it('shows title character count when approaching limit', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    const text = 'a'.repeat(151)

    await user.type(titleInput, text)

    expect(screen.getByText('49 characters remaining')).toBeInTheDocument()
  })

  it('shows description character count when approaching limit', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const descriptionInput = screen.getByPlaceholderText('Add details (optional)')
    const text = 'a'.repeat(801)

    await user.type(descriptionInput, text)

    expect(screen.getByText('199 characters remaining')).toBeInTheDocument()
  })

  it('clears error when user starts typing in title', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const button = screen.getByRole('button', { name: 'Add todo' })
    await user.click(button)

    expect(screen.getByText('Please enter a todo title')).toBeInTheDocument()

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    await user.type(titleInput, 'a')

    expect(screen.queryByText('Please enter a todo title')).not.toBeInTheDocument()
  })

  it('submits form when Enter key is pressed in title input', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')

    await user.type(titleInput, 'Test todo{Enter}')

    expect(mockOnAdd).toHaveBeenCalledWith('Test todo', undefined)
  })

  it('focuses back to title input after submission', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    const button = screen.getByRole('button', { name: 'Add todo' })

    await user.type(titleInput, 'Test todo')
    await user.click(button)

    // Check that the title input is focused after submission
    expect(titleInput).toHaveFocus()
  })
})
