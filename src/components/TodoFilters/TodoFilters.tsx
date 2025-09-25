import React, { useCallback } from 'react'
import styles from './TodoFilters.module.css'

interface TodoFiltersProps {
  currentFilter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
}

const FILTERS: ('all' | 'active' | 'completed')[] = ['all', 'active', 'completed']

const TodoFilters: React.FC<TodoFiltersProps> = ({ currentFilter, onFilterChange }) => {
  const handleFilterChange = useCallback(
    (filter: 'all' | 'active' | 'completed') => {
      onFilterChange(filter)
    },
    [onFilterChange]
  )

  return (
    <div className={styles.filters}>
      {FILTERS.map(filter => (
        <button
          key={filter}
          className={currentFilter === filter ? styles.active : ''}
          onClick={() => handleFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default React.memo(TodoFilters)
