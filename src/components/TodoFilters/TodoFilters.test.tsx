import { render, screen, fireEvent } from '@testing-library/react'
import TodoFilters from './TodoFilters'

describe('TodoFilters', () => {
  const onFilterChange = jest.fn()

  it('renders the filter buttons', () => {
    render(<TodoFilters currentFilter="all" onFilterChange={onFilterChange} />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('calls onFilterChange when a filter button is clicked', () => {
    render(<TodoFilters currentFilter="all" onFilterChange={onFilterChange} />)
    fireEvent.click(screen.getByText('Active'))
    expect(onFilterChange).toHaveBeenCalledWith('active')
  })

  it('highlights the active filter', () => {
    render(<TodoFilters currentFilter="completed" onFilterChange={onFilterChange} />)
    expect(screen.getByText('Completed')).toHaveClass('active')
    expect(screen.getByText('All')).not.toHaveClass('active')
  })
})
