import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User is required"],
      index: true
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: 1,
      maxLength: 255,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    todoStatus: {
        type: String,
        enum: ['active', 'deleted'],
        default: 'active'
    }
  },
  {
    timestamps: true,
  }
);

todoSchema.pre('save', function (next) {
    this.todoStatus = 'active';
    this.isCompleted = false;
    next();
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;