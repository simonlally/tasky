import React, { useContext } from "react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import { Card, Icon, Label, Button } from "semantic-ui-react";

const TaskCard = ({ task: { username, createdAt, body, completed } }) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content style={{ height: "120px" }}>
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description style={{ overflow: "auto", height: "60px" }}>
          {body}
          <div>
            {completed ? <div> completed </div> : <div> not completed </div>}
          </div>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default TaskCard;
