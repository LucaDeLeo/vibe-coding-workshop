import { useMemo } from 'react'
import { Todo } from '../../types/todo'
import { TodoItem } from '../TodoItem/TodoItem'
import styles from './TodoList.module.css'

interface TodoListProps {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, filter, onToggle, onDelete }) => {
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const emptyMessages = {
    all: 'No todos yet. Add one above to get started!',
    active: 'No active todos. Great job!',
    completed: 'No completed todos yet.',
  }

  if (filteredTodos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>{emptyMessages[filter]}</p>
      </div>
    )
  }

  return (
    <ul className={styles.todoList}>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
