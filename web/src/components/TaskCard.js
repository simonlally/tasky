import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import EasyEdit from "react-easy-edit";

import DeleteTask from "./DeleteTask";
import { AuthContext } from "../context/auth";
import { Card, Button, Form, Checkbox } from "semantic-ui-react";

import {
  EDIT_TASK,
  GET_TASKS_BY_USER_QUERY,
  TOGGLE_TASK,
} from "../util/graphql";

const TaskCard = ({ task: { id, username, createdAt, body, completed } }) => {
  const { user } = useContext(AuthContext);

  const [currentStatus, setCurrentStatus] = useState(completed ? true : false);

  const save = (body) => {
    editTask({ variables: { taskId: id, body: body } });
  };

  const cancel = () => {
    alert("Cancelled");
  };

  const [editTask] = useMutation(EDIT_TASK);
  const [toggleTask] = useMutation(TOGGLE_TASK);

  const onCheck = () => {
    toggleTask({ variables: { taskId: id } });

    console.log("current status is now: ", currentStatus);

    if (currentStatus === true) {
      setCurrentStatus(false);
    } else if (currentStatus === false) {
      setCurrentStatus(true);
    }
  };

  return (
    <Card
      style={{ marginTop: "25px", marginBottom: "25px", paddingBottom: "40px" }}
      fluid
    >
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

          <Checkbox onClick={onCheck} />

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
