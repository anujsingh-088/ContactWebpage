import React from "react";
const SendMessage = props => {
  return (
    <div>
      <input
        type="text"
        name="name"
        value={props.name}
        placeholder="Name..."
        disabled
      />
      <input
        type="text"
        name="phone"
        value={props.phone_no}
        placeholder="phone no..."
        disabled
      />
      <textarea
        rows="8"
        cols="40"
        name="message"
        onChange={props.changeMessage}
        value={props.message}
        placeholder="Message"
      />
      <button type="click" onClick={props.send}>
        send
      </button>
    </div>
  );
};
export default SendMessage;
