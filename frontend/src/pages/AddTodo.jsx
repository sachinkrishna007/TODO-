import React from "react";
import TodoForm from "../components/TodoForm";

import { useNavigate } from "react-router-dom";
import { useTodo } from "../context/TodeContext";
import axios from "axios";


const AddTodo = () => {
  const navigate = useNavigate();
  const { fetchTodos } = useTodo();

  const handleSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:3000/api/user/addTodo", formData);
      await fetchTodos();
      navigate("/");
    } catch (error) {
      alert("Error adding todo");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Todo</h1>
      <TodoForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddTodo;
