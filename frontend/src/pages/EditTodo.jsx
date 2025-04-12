import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import { useTodo } from '../context/TodeContext';
import axios from 'axios';


const EditTodo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();
  const { fetchTodos } = useTodo();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/user/getTodo/${id}`);
        setTodo(res.data);
      } catch (err) {
        alert('Todo not found');
        navigate('/');
      }
    };
    fetchTodo();
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    try {
      await axios.put(`http://localhost:3000/api/user/update/${id}`, formData);
      await fetchTodos();
      navigate('/');
    } catch (err) {
      alert('Error updating todo');
    }
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
      <TodoForm onSubmit={handleUpdate} initialData={todo} />
    </div>
  );
};

export default EditTodo;
