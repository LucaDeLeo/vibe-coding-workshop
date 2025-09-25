import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTodo } from './AddTodo'

describe('AddTodo', () => {
  const mockOnAdd = jest.fn()

  beforeEach(() => {
    mockOnAdd.mockClear()
  })

  it('renders input and button', () => {
    render(<AddTodo onAdd={mockOnAdd} />)

    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add todo' })).toBeInTheDocument()
  })

  it('calls onAdd with trimmed text when form is submitted', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    const button = screen.getByRole('button', { name: 'Add todo' })

    await user.type(input, '  Test todo  ')
    await user.click(button)

    expect(mockOnAdd).toHaveBeenCalledWith('Test todo')
    expect(mockOnAdd).toHaveBeenCalledTimes(1)
  })

  it('clears input after successful submission', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement

    await user.type(input, 'Test todo')
    await user.click(screen.getByRole('button', { name: 'Add todo' }))

    expect(input.value).toBe('')
  })

  it('shows error when trying to add empty todo', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const button = screen.getByRole('button', { name: 'Add todo' })
    await user.click(button)

    expect(screen.getByText('Please enter a todo')).toBeInTheDocument()
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('prevents entering more than 200 characters', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const longText = 'a'.repeat(201)
    const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement

    await user.type(input, longText)

    // Input should be truncated at 200 characters due to maxLength attribute
    expect(input.value).toHaveLength(200)
  })

  it('shows character count when approaching limit', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    const text = 'a'.repeat(151)

    await user.type(input, text)

    expect(screen.getByText('49 characters remaining')).toBeInTheDocument()
  })

  it('clears error when user starts typing', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const button = screen.getByRole('button', { name: 'Add todo' })
    await user.click(button)

    expect(screen.getByText('Please enter a todo')).toBeInTheDocument()

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'a')

    expect(screen.queryByText('Please enter a todo')).not.toBeInTheDocument()
  })

  it('submits form when Enter key is pressed', async () => {
    const user = userEvent.setup()
    render(<AddTodo onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText('What needs to be done?')

    await user.type(input, 'Test todo{Enter}')

    expect(mockOnAdd).toHaveBeenCalledWith('Test todo')
  })
})
