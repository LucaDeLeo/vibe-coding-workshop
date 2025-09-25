import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: MemoryRouter })
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the app title', () => {
    renderWithRouter(<App />)
    const title = screen.getByText('Simple Todo App')
    expect(title).toBeInTheDocument()
  })

  it('shows empty state message initially', () => {
    renderWithRouter(<App />)
    const emptyMessage = screen.getByText('No todos yet. Add one above to get started!')
    expect(emptyMessage).toBeInTheDocument()
  })

  it('adds a new todo with title when form is submitted', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    const addButton = screen.getByRole('button', { name: 'Add todo' })

    await user.type(titleInput, 'Test todo item')
    await user.click(addButton)

    expect(screen.getByText('Test todo item')).toBeInTheDocument()
    expect(
      screen.queryByText('No todos yet. Add one above to get started!')
    ).not.toBeInTheDocument()
  })

  it('adds a new todo with title and description', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    const descriptionInput = screen.getByPlaceholderText('Add details (optional)')
    const addButton = screen.getByRole('button', { name: 'Add todo' })

    await user.type(titleInput, 'Test todo item')
    await user.type(descriptionInput, 'Test description')
    await user.click(addButton)

    expect(screen.getByText('Test todo item')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('adds multiple todos and displays them in order (newest first)', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')

    await user.type(titleInput, 'First todo{enter}')
    await user.type(titleInput, 'Second todo{enter}')
    await user.type(titleInput, 'Third todo{enter}')

    // Check that todos are displayed in newest-first order
    const todoItems = screen.getAllByText(/todo/)
    expect(todoItems[0]).toHaveTextContent('Third todo')
    expect(todoItems[1]).toHaveTextContent('Second todo')
    expect(todoItems[2]).toHaveTextContent('First todo')
  })

  it('toggles todo completion when checkbox is clicked', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    await user.type(titleInput, 'Test todo')
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
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    await user.type(titleInput, 'Todo 1{enter}')
    await user.type(titleInput, 'Todo 2{enter}')

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
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    await user.type(titleInput, 'Todo to delete')
    await user.click(screen.getByRole('button', { name: 'Add todo' }))

    expect(screen.getByText('Todo to delete')).toBeInTheDocument()

    const deleteButton = screen.getByRole('button', { name: 'Delete todo' })
    await user.click(deleteButton)

    expect(screen.queryByText('Todo to delete')).not.toBeInTheDocument()
    expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument()
  })

  it('deletes multiple todos and returns to empty state', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    await user.type(titleInput, 'Todo 1{enter}')
    await user.type(titleInput, 'Todo 2{enter}')

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
    renderWithRouter(<App />)

    const addButton = screen.getByRole('button', { name: 'Add todo' })
    await user.click(addButton)

    expect(screen.getByText('Please enter a todo title')).toBeInTheDocument()
    expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument()
  })

  it('prevents adding todos with titles exceeding 200 characters', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    const addButton = screen.getByRole('button', { name: 'Add todo' })

    const longText = 'a'.repeat(201)
    await user.type(titleInput, longText)
    await user.click(addButton)

    expect(screen.getByText(/Todo title must be less than 200 characters/)).toBeInTheDocument()
  })

  it('prevents adding todos with descriptions exceeding 1000 characters', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    const descriptionInput = screen.getByPlaceholderText('Add details (optional)')
    const addButton = screen.getByRole('button', { name: 'Add todo' })

    await user.type(titleInput, 'Test todo')
    const longText = 'a'.repeat(1001)
    await user.type(descriptionInput, longText)
    await user.click(addButton)

    expect(
      screen.getByText(/Todo description must be less than 1000 characters/)
    ).toBeInTheDocument()
  })

  it('handles title character limit and shows remaining count', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    const longText = 'a'.repeat(151)
    await user.type(titleInput, longText)

    expect(screen.getByText('49 characters remaining')).toBeInTheDocument()
  })

  it('handles description character limit and shows remaining count', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const descriptionInput = screen.getByPlaceholderText('Add details (optional)')
    const longText = 'a'.repeat(801)
    await user.type(descriptionInput, longText)

    expect(screen.getByText('199 characters remaining')).toBeInTheDocument()
  })

  it('focuses back to title input after adding a todo', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const titleInput = screen.getByPlaceholderText('What needs to be done?')
    const addButton = screen.getByRole('button', { name: 'Add todo' })

    await user.type(titleInput, 'Test todo')
    await user.click(addButton)

    // Check that the title input is focused after submission
    expect(titleInput).toHaveFocus()
  })
})
