import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_TASKS_BY_USER_QUERY } from "../util/graphql";

const UserFeed = (user) => {
  const username = user.user.user.username;
  let tasks = [];

  const { error, loading, data } = useQuery(GET_TASKS_BY_USER_QUERY, {
    variables: { username },
  });

  if (loading) return <div> LOADING </div>;

  if (data && data.getTasksByUser) {
    tasks = data.getTasksByUser;
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          {" "}
          {task.body}
          <div> username: {task.username} </div>{" "}
        </div>
      ))}
    </div>
  );
};

export default UserFeed;
