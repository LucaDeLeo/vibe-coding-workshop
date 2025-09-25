import { Todo } from '../../types/todo'
import styles from './TodoItem.module.css'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={styles.todoItem}>
      <div className={styles.todoContent}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className={styles.checkbox}
          id={`todo-${todo.id}`}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`${styles.text} ${todo.completed ? styles.completed : ''}`}
        >
          {todo.text}
        </label>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className={styles.deleteButton}
        aria-label="Delete todo"
      >
        ✕
      </button>
    </li>
  )
}
