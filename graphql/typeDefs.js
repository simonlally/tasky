const { gql } = require("apollo-server");

module.exports = gql`
  type Task {
    id: ID!
    body: String!
    completed: Boolean!
  }

  type Query {
    getTasks: [Task]
  }

  type Mutation {
    createTask(body: String!): Task!
  }
`;
