import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

import UserFeed from "../components/UserFeed";

export default function Home() {
  const { user } = useContext(AuthContext);

  const home = user ? (
    <div>
      <div>
        <UserFeed user={{ user }} />
      </div>
    </div>
  ) : (
    <div> Login to view your tasks!</div>
  );

  return home;
}
