import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import EasyEdit from "react-easy-edit";

import DeleteTask from "./DeleteTask";
import { AuthContext } from "../context/auth";
import { Card, Button, Form } from "semantic-ui-react";

import { EDIT_TASK, GET_TASKS_BY_USER_QUERY } from "../util/graphql";

const TaskCard = ({ task: { id, username, createdAt, body, completed } }) => {
  const { user } = useContext(AuthContext);
  const [newTaskBody, setNewTaskBody] = useState(body);

  // const [isToggleOn, setIsToggleOn] = useState(false);

  let newTaskbody = "";

  const save = (body) => {
    editTask({ variables: { taskId: id, body: body } });
  };

  const cancel = () => {
    alert("Cancelled");
  };

  const [editTask] = useMutation(EDIT_TASK);

  // function handleClick() {
  //   isToggleOn ? setIsToggleOn(false) : setIsToggleOn(true);
  // }

  return (
    <Card fluid>
      <Card.Content style={{ height: "100px" }}>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          <EasyEdit
            type="text"
            value={body}
            onSave={save}
            onCancel={cancel}
            saveButtonLabel="Save Me"
            cancelButtonLabel="Cancel Me"
            attributes={{ name: "awesome-input", id: 1 }}
            instructions=""
            allowEdit={true}
          />

          <div>
            {completed ? <div> completed </div> : <div> not completed </div>}
          </div>

          <DeleteTask username={username} taskId={id} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default TaskCard;
