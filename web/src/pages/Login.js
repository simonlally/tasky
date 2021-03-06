import React, { useState, useContext } from "react";
import { Form, Button, Grid, Card, Header } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

import { CardContainer } from "../styles/styles";

import { LOGIN_USER } from "../util/graphql";
import { useForm } from "../util/hooks";

export default function Login(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const login = () => {
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(login, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  return (
    <>
      <Grid centered columns={1}>
        <Grid.Row>
          <CardContainer>
            <Card.Content textAlign="left">
              <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
              >
                <Header as="h1" textAlign="center">
                  Login
                </Header>
                <Form.Input
                  label="Username"
                  placeholder="Username..."
                  name="username"
                  value={values.username}
                  onChange={onChange}
                />
                <Form.Input
                  label="Password"
                  placeholder="Password..."
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={onChange}
                />
                <Button type="submit" primary>
                  Login
                </Button>
              </Form>
              {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                  <ul className="list">
                    {Object.values(errors).map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Content>
          </CardContainer>
        </Grid.Row>
      </Grid>
    </>
  );
}
