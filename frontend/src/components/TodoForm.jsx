import React, { useState } from 'react';

const TodoForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [status, setStatus] = useState(initialData.status || 'pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    onSubmit({ title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Save
      </button>
    </form>
  );
};

export default TodoForm;
