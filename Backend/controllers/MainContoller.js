import Booking from "../models/BookingModel.js";
import TODO from "../models/todoModel.js";

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const todo = await TODO.create({ title, description, status });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await TODO.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get single todo
const getTodoById = async (req, res) => {
  console.log('hee');
  
  try {
    const todo = await TODO.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  console.log('adas');
  
  try {
    const { title, description, status } = req.body;
    const todo = await TODO.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await TODO.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
export { createTodo, deleteTodo, updateTodo, getTodos,getTodoById };
