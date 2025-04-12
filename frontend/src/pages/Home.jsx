import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useTodo } from '../context/TodeContext';


const Home = () => {
  const { todos, loading, error, fetchTodos } = useTodo();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await axios.delete(`http://localhost:3000/api/user/deletetodo/${id}`);
        await fetchTodos();
      } catch (err) {
        alert('Failed to delete todo');
      }
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Todo List</h1>
        <Link
          to="/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
        >
           Add Todo
        </Link>
      </div>

      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos found.</p>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{todo.title}</h2>
                  {todo.description && (
                    <p className="text-gray-600 mt-1">{todo.description}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">Status: {todo.status}</p>
                </div>

                <div className="flex gap-2 mt-1">
                  <Link
                    to={`/edit/${todo._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                     Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                     Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
