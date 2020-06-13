import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_TASKS_BY_USER_QUERY } from "../util/graphql";

const UserFeed = (user) => {
  const [tasks, setTasks] = useState([]);
  const username = user.user.user.username;

  const { error, loading, data } = useQuery(GET_TASKS_BY_USER_QUERY, {
    variables: { username },
  });

  console.log(data);

  return <div>hello</div>;
};

export default UserFeed;
