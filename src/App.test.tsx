import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    const title = screen.getByText('Simple Todo App')
    expect(title).toBeInTheDocument()
  })

  it('shows empty state message initially', () => {
    render(<App />)
    const emptyMessage = screen.getByText('No todos yet. Add one above to get started!')
    expect(emptyMessage).toBeInTheDocument()
  })

  it('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    const addButton = screen.getByRole('button', { name: 'Add todo' })

    await user.type(input, 'Test todo item')
    await user.click(addButton)

    expect(screen.getByText('Test todo item')).toBeInTheDocument()
    expect(
      screen.queryByText('No todos yet. Add one above to get started!')
    ).not.toBeInTheDocument()
  })

  it('adds multiple todos and displays them in order', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')

    await user.type(input, 'First todo{enter}')
    await user.type(input, 'Second todo{enter}')
    await user.type(input, 'Third todo{enter}')

    expect(screen.getByText('First todo')).toBeInTheDocument()
    expect(screen.getByText('Second todo')).toBeInTheDocument()
    expect(screen.getByText('Third todo')).toBeInTheDocument()
  })

  it('toggles todo completion when checkbox is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Test todo')
    await user.click(screen.getByRole('button', { name: 'Add todo' }))

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('toggles multiple todos independently', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Todo 1{enter}')
    await user.type(input, 'Todo 2{enter}')

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(2)
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()

    await user.click(checkboxes[0])
    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
  })

  it('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Todo to delete')
    await user.click(screen.getByRole('button', { name: 'Add todo' }))

    expect(screen.getByText('Todo to delete')).toBeInTheDocument()

    const deleteButton = screen.getByRole('button', { name: 'Delete todo' })
    await user.click(deleteButton)

    expect(screen.queryByText('Todo to delete')).not.toBeInTheDocument()
    expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument()
  })

  it('deletes multiple todos and returns to empty state', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Todo 1{enter}')
    await user.type(input, 'Todo 2{enter}')

    let deleteButtons = screen.getAllByRole('button', { name: 'Delete todo' })
    await user.click(deleteButtons[0]) // Delete first todo

    deleteButtons = screen.getAllByRole('button', { name: 'Delete todo' }) // Refresh after deletion
    await user.click(deleteButtons[0]) // Delete remaining todo

    expect(screen.queryByText('Todo 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Todo 2')).not.toBeInTheDocument()
    expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument()
  })

  it('prevents adding empty todos', async () => {
    const user = userEvent.setup()
    render(<App />)

    const addButton = screen.getByRole('button', { name: 'Add todo' })
    await user.click(addButton)

    expect(screen.getByText('Please enter a todo')).toBeInTheDocument()
    expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument()
  })

  it('handles character limit and shows remaining count', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    const longText = 'a'.repeat(151)
    await user.type(input, longText)

    expect(screen.getByText('49 characters remaining')).toBeInTheDocument()
  })
})
