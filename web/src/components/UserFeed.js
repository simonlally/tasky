import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_TASKS_BY_USER_QUERY } from "../util/graphql";
import NewTask from "./NewTask";
import TaskCard from "./TaskCard";

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
      <NewTask username={username} />
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
};

export default UserFeed;
