import mongoose from "mongoose";
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});


const TODO= mongoose.model("todo", todoSchema);
export default TODO