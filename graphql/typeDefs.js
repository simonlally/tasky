const { gql } = require("apollo-server");

module.exports = gql`
  type Task {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    completed: Boolean!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getTasks: [Task]
    getTask(taskId: ID!): Task
  }

  type Mutation {
    createTask(body: String!): Task!
    deleteTask(taskId: ID!): String!
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    completeTask(taskId: ID!): Task!
  }
`;
