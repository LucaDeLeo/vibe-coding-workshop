import { useState } from 'react'
import styles from './AddTodo.module.css'

interface AddTodoProps {
  onAdd: (text: string) => void
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedText = text.trim()
    if (!trimmedText) {
      setError('Please enter a todo')
      return
    }

    if (trimmedText.length > 200) {
      setError('Todo must be less than 200 characters')
      return
    }

    onAdd(trimmedText)
    setText('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.addTodoForm}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={text}
          onChange={e => {
            setText(e.target.value)
            setError('')
          }}
          placeholder="What needs to be done?"
          className={styles.input}
          aria-label="New todo"
          maxLength={200}
        />
        <button type="submit" className={styles.addButton} aria-label="Add todo">
          Add
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {text.length > 150 && (
        <p className={styles.charCount}>{200 - text.length} characters remaining</p>
      )}
    </form>
  )
}
