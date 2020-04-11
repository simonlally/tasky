const { gql } = require("apollo-server");

module.exports = gql`
  type Task {
    id: ID!
    body: String!
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
  }

  type Mutation {
    createTask(body: String!): Task!
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
