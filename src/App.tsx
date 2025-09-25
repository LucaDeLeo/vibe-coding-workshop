import { useState } from 'react'
import './App.css'
import { TodoList } from './components/TodoList/TodoList'
import { AddTodo } from './components/AddTodo/AddTodo'
import { Todo } from './types/todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos([...todos, newTodo])
  }

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Simple Todo App</h1>
      </header>
      <main className="app-main">
        <AddTodo onAdd={handleAddTodo} />
        <TodoList todos={todos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
      </main>
    </div>
  )
}

export default App
