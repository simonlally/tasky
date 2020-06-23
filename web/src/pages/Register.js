import React, { useState, useContext } from "react";
import { Form, Button, Card, Grid, Header } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

import { REGISTER_USER } from "../util/graphql";

import { useForm } from "../util/hooks";

export default function Register(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const registerUser = () => {
    addUser();
  };

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);
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
          <Card>
            <Card.Content textAlign="left">
              <Form
                style={{ padding: "20px" }}
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
              >
                <Header as="h1" textAlign="center">
                  Sign Up
                </Header>
                <Form.Input
                  label="Username"
                  placeholder="Username..."
                  name="username"
                  error={errors.username ? true : false}
                  value={values.username}
                  onChange={onChange}
                ></Form.Input>
                <Form.Input
                  label="Email"
                  placeholder="Email..."
                  name="email"
                  value={values.email}
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
                <Form.Input
                  label="Confirm Password"
                  placeholder="Confirm Password..."
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={onChange}
                />
                <Button type="submit" primary>
                  Let's go!
                </Button>
              </Form>
            </Card.Content>
            {Object.keys(errors).length > 0 && (
              <div className="ui error message">
                <ul className="list">
                  {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </Grid.Row>
      </Grid>
    </>
  );
}
