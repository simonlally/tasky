const Task = require("../../models/Task");
const validateAuth = require("../../util/validateAuth");

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
    async getTask(_, { taskId }) {
      try {
        const task = await Task.findById(taskId);

        if (task) {
          return task;
        } else {
          throw new Error("Task not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createTask(_, { body }, context) {
      const user = validateAuth(context);
      if (body.trim() === "") {
        throw new Error("Task cannot be empty");
      }

      const newTask = new Task({
        body,
        user: user.id,
        username: user.username,
        completed: false,
        createdAt: new Date().toISOString(),
      });

      const task = await newTask.save();
      return task;
    },
  },
};
