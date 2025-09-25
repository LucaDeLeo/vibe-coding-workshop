import { useState, useRef } from 'react'
import styles from './AddTodo.module.css'

interface AddTodoProps {
  onAdd: (title: string, description?: string) => void
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const titleInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setError('Please enter a todo title')
      return
    }

    if (trimmedTitle.length > 200) {
      setError('Todo title must be less than 200 characters')
      return
    }

    if (description && description.length > 1000) {
      setError('Todo description must be less than 1000 characters')
      return
    }

    onAdd(trimmedTitle, description || undefined)
    setTitle('')
    setDescription('')
    setError('')

    // Focus back to title input for quick entry
    if (titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.addTodoForm}>
      <div className={styles.inputWrapper}>
        <input
          ref={titleInputRef}
          type="text"
          value={title}
          onChange={e => {
            setTitle(e.target.value)
            setError('')
          }}
          placeholder="What needs to be done?"
          className={styles.input}
          aria-label="New todo title"
          autoFocus
        />
        <button type="submit" className={styles.addButton} aria-label="Add todo">
          Add
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {title.length > 150 && (
        <p className={styles.charCount}>{200 - title.length} characters remaining</p>
      )}
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Add details (optional)"
        className={styles.description}
        aria-label="Todo description"
        rows={2}
      />
      {description.length > 800 && (
        <p className={styles.charCount}>{1000 - description.length} characters remaining</p>
      )}
    </form>
  )
}
