const Task = require("../../models/Task");
const validateAuth = require("../../util/validateAuth");

const { AuthenticationError, UserInputError } = require("apollo-server");

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
    async getTasksByUser(_, { username }) {
      const tasks = await Task.find({ username });
      console.log(tasks);
      if (tasks) {
        return tasks;
      } else {
        throw new Error("No tasks found");
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

    async deleteTask(_, { taskId }, context) {
      const user = validateAuth(context);

      try {
        const task = await Task.findById(taskId);

        if (user.username === task.username) {
          await task.delete();
          return "Task deleted successfully";
        } else {
          throw new AuthenticationError("Not Allowed");
        }
      } catch (err) {
        throw new AuthenticationError(err);
      }
    },

    async completeTask(_, { taskId }, context) {
      const user = validateAuth(context);

      const task = await Task.findById(taskId);

      if (task) {
        if (task.username === user.username) {
          if (task.completed === false) {
            task.completed = true;
          } else {
            task.completed = false;
          }
          await task.save();
          return task;
        }
      } else {
        throw new UserInputError("Task Not Found");
      }
    },

    async editTask(_, { taskId, body }, context) {
      const user = validateAuth(context);

      const task = await Task.findById(taskId);

      if (task) {
        if (task.username === user.username) {
          task.body = body;
          await task.save();
          return task;
        } else {
          throw new AuthenticationError("Not Allowed");
        }
      } else {
        throw new UserInputError("Task Not Found");
      }
    },
  },
};
