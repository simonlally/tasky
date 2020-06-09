const tasksResolvers = require("./tasks");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...tasksResolvers.Query,
  },
  Mutation: {
    ...tasksResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};
