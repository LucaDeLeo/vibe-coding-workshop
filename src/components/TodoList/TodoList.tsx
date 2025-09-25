import { Todo } from '../../types/todo'
import { TodoItem } from '../TodoItem/TodoItem'
import styles from './TodoList.module.css'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No todos yet. Add one above to get started!</p>
      </div>
    )
  }

  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
