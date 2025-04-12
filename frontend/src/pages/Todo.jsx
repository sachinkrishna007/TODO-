import React, { useState } from 'react';

const Todo = () => {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-indigo-600">ToDo List</h1>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input
            value={toDo}
            onChange={(event) => setTodo(event.target.value)}
            type="text"
            placeholder="🖊️ Add item..."
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={() => {
              if (toDo.trim()) {
                setTodos([
                  ...toDos,
                  { id: Date.now(), text: toDo.trim(), status: false },
                ]);
                setTodo('');
              }
            }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            +
          </button>
        </div>

        <div className="space-y-3">
          {toDos.map((obj) => (
            <div
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
              key={obj.id}
            >
              <div className="flex items-center gap-3">
                <input
                  onChange={(e) => {
                    setTodos(
                      toDos.map((obj2) =>
                        obj2.id === obj.id
                          ? { ...obj2, status: e.target.checked }
                          : obj2
                      )
                    );
                  }}
                  checked={obj.status}
                  type="checkbox"
                  className="w-5 h-5"
                />
                <p className={`${obj.status ? 'line-through text-gray-500' : ''}`}>
                  {obj.text}
                </p>
              </div>
              <button
                onClick={() =>
                  setTodos(toDos.filter((obj3) => obj3.id !== obj.id))
                }
                className="text-red-500 hover:text-red-700 text-xl"
              >
                ✕
              </button>
            </div>
          ))}

          {toDos.some((obj) => obj.status) && (
            <h2 className="mt-6 text-xl font-semibold text-green-600">
              Finished Tasks
            </h2>
          )}

          {toDos
            .filter((obj) => obj.status)
            .map((obj) => (
              <h2 key={obj.id} className="text-green-700 pl-2">
                ✅ {obj.text}
              </h2>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
