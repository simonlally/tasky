import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function Home() {
  const { user } = useContext(AuthContext);

  const home = user ? <div> you're logged in </div> : <div> please login!</div>;

  return home;
}
