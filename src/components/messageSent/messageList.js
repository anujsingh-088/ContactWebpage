import React from "react";
const MessageList = props => {
  return (
    <div>
      <p>
        {props.name} {props.time} {props.sentMessage}
      </p>
    </div>
  );
};
export default MessageList;
