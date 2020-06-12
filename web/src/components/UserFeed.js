import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_TASKS_BY_USER_QUERY, GET_ALL_TASKS } from "../util/graphql";

const UserFeed = (user) => {
  const username = user.user.user.username;

  console.log(username);

  const { error, loading, data } = useQuery(GET_TASKS_BY_USER_QUERY, {
    variables: { username },
  });

  console.log("data", data);

  return <div>hello</div>;
};

export default UserFeed;
