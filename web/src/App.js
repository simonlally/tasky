import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import { AuthProvider } from "./context/auth";
import Home from "./pages/Home";

import { Container } from "semantic-ui-react";

export default function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar />
          <Route exact path="/" component={Home} />
        </Router>
      </Container>
    </AuthProvider>
  );
}
