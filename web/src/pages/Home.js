import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

import UserFeed from "../components/UserFeed";

import { GET_TASKS_BY_USER_QUERY } from "../util/graphql";

export default function Home() {
  const { user } = useContext(AuthContext);

  console.log("user", user);

  const home = user ? (
    <div>
      <div>
        {" "}
        <UserFeed user={{ user }} />{" "}
      </div>
    </div>
  ) : (
    <div> Login to view your tasks!</div>
  );

  return home;
}
