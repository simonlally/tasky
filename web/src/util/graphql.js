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
