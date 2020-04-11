const Task = require("../../models/Task");

module.exports = {
  Query: {
    async getTasks() {
      try {
        const tasks = await Task.find();
        return tasks;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createTask(_, { body }) {
      console.log("body: ", body);
      if (body.trim() === "") {
        throw new Error("Task cannot be empty");
      }

      const newTask = new Task({
        body,
        completed: false,
      });

      const task = await newTask.save();
      console.log("TASK", task);
      return task;
    },
  },
};
