const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
  body: String,
  completed: Boolean,
});

module.exports = model("Task", taskSchema);
