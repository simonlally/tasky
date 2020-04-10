const tasksResolvers = require("./tasks");

module.exports = {
  Query: {
    ...tasksResolvers.Query,
  },
};
