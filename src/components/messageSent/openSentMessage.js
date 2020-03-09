import React from "react";
const OpenSentMessage = props => {
  return (
    <div>
      <button type="click" onClick={props.openSentMessage}>
        Sent Messages
      </button>
    </div>
  );
};
export default OpenSentMessage;
