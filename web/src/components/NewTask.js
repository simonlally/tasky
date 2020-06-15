import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Form, Button, Card, Header } from "semantic-ui-react";

import { GET_TASKS_BY_USER_QUERY, CREATE_TASK } from "../util/graphql";

const NewTask = (props) => {
  const [values, setValues] = useState({
    body: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTask();
  };

  const [createTask, { error }] = useMutation(CREATE_TASK, {
    variables: values,
  });

  return (
    <div>
      <>
        <Card fluid>
          <Card.Content>
            <Form onSubmit={onSubmit}>
              <Header as="h3" textAlign="left">
                Enter a new task below
              </Header>
              <Form.Field>
                <Form.TextArea
                  rows={2}
                  placeholder="..."
                  name="body"
                  onChange={onChange}
                  value={values.body}
                  error={error ? true : false}
                />
                <Button color="blue" type="submit">
                  submit
                </Button>
              </Form.Field>
            </Form>
          </Card.Content>
        </Card>
        {error && (
          <div className="ui error message">
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </>
    </div>
  );
};

export default NewTask;
