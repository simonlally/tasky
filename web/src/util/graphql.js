import gql from "graphql-tag";

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
