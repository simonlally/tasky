import gql from "graphql-tag";

// task queries
export const GET_TASKS_BY_USER_QUERY = gql`
  query($username: String!) {
    getTasksByUser(username: $username) {
      id
      body
      username
      createdAt
    }
  }
`;

// task mutations
export const CREATE_TASK = gql`
  mutation($body: String!) {
    createTask(body: $body) {
      id
      body
      username
      createdAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`;

// user mutations
export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
