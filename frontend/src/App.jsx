import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import BookingPage from "./pages/BookingPage";
import Todo from "./pages/Todo";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import { TodoProvider } from "./context/TodeContext";

function App() {
  return (
    <div>
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </TodoProvider>
    </div>
  );
}

export default App;
