import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/user/todos');
      setTodos(res.data);
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos, fetchTodos, loading, error }}>
      {children}
    </TodoContext.Provider>
  );
};
