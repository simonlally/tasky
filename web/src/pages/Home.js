import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function Home() {
  const { user } = useContext(AuthContext);

  return <div> HOME </div>;
}
