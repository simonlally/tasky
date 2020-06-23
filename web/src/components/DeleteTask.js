import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { DELETE_TASK, GET_TASKS_BY_USER_QUERY } from "../util/graphql";

const DeleteTask = ({ username, taskId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteTask] = useMutation(DELETE_TASK, {
    update(proxy) {
      // are you sure you want to delete this post?
      setConfirmOpen(false);

      const data = proxy.readQuery({
        query: GET_TASKS_BY_USER_QUERY,
        variables: { username },
      });

      data.getTasksByUser = data.getTasksByUser.filter((t) => t.id !== taskId);
      proxy.writeQuery({ query: GET_TASKS_BY_USER_QUERY, data });

      if (callback) callback();

      window.location.reload(false);
    },
    variables: { taskId },
  });

  return (
    <>
      <Button
        size="small"
        basic
        color="red"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon fitted name="x" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteTask}
      />
    </>
  );
};

export default DeleteTask;
