import { useReducer, useEffect } from 'react'
import './App.css'
import { TodoList } from './components/TodoList/TodoList'
import { AddTodo } from './components/AddTodo/AddTodo'
import TodoFilters from './components/TodoFilters/TodoFilters'
import { Todo } from './types/todo'

interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  isLoading: boolean
  error: string | null
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: { title: string; description?: string } }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'REORDER_TODOS'; payload: string[] }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'LOAD_TODOS'; payload: Todo[] }
  | { type: 'SET_ERROR'; payload: string }

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      const maxOrder = state.todos.length > 0 ? Math.max(...state.todos.map(t => t.order)) : -1
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
        order: maxOrder + 1,
      }
      return { ...state, todos: [newTodo, ...state.todos] }

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, ...action.payload.updates } : todo
        ),
      }

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      }

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed,
                completedAt: !todo.completed ? new Date().toISOString() : null,
              }
            : todo
        ),
      }

    case 'REORDER_TODOS':
      const reorderedTodos = [...state.todos]
      const newTodos = action.payload
        .map((id, index) => {
          const todo = reorderedTodos.find(t => t.id === id)
          return todo ? { ...todo, order: index } : null
        })
        .filter(Boolean) as Todo[]
      return { ...state, todos: newTodos }

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      }

    case 'SET_FILTER':
      return { ...state, filter: action.payload }

    case 'LOAD_TODOS':
      return { ...state, todos: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload }

    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
    filter: 'all',
    isLoading: false,
    error: null,
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '')
      if (['all', 'active', 'completed'].includes(hash)) {
        dispatch({ type: 'SET_FILTER', payload: hash as 'all' | 'active' | 'completed' })
      } else {
        dispatch({ type: 'SET_FILTER', payload: 'all' })
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Initial load

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos))
  }, [state.todos])

  const handleFilterChange = (filter: 'all' | 'active' | 'completed') => {
    window.location.hash = `/${filter}`
  }

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed
    if (state.filter === 'completed') return todo.completed
    return true
  })

  const handleAddTodo = (title: string, description?: string) => {
    // Validate input
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a todo title' })
      return
    }

    if (trimmedTitle.length > 200) {
      dispatch({ type: 'SET_ERROR', payload: 'Todo title must be less than 200 characters' })
      return
    }

    if (description && description.length > 1000) {
      dispatch({ type: 'SET_ERROR', payload: 'Todo description must be less than 1000 characters' })
      return
    }

    dispatch({ type: 'ADD_TODO', payload: { title: trimmedTitle, description } })
  }

  const handleToggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  }

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Simple Todo App</h1>
      </header>
      <main className="app-main">
        <AddTodo onAdd={handleAddTodo} />
        <TodoFilters currentFilter={state.filter} onFilterChange={handleFilterChange} />
        {state.error && <div className="error">{state.error}</div>}
        <TodoList
          todos={filteredTodos}
          filter={state.filter}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </main>
    </div>
  )
}

export default App
