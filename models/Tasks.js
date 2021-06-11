import mongoose from "mongoose";
// import autoIncriment from "mongoose-auto-increment";

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tasks: [
    {
      task: {
        type: String,
        required: true,
      },
      createDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// autoIncriment.initialize(mongoose.connection);
// taskSchema.plugin(autoIncriment.plugin, "task");

export default mongoose.model("task", taskSchema);
