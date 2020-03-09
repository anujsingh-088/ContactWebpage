import React from "react";
const InputDetails = props => {
  return (
    <div>
      <input
        type="text"
        name="first_name"
        onChange={props.changeHandler}
        value={props.first_name}
        placeholder="first Name..."
      />
      <input
        type="text"
        name="last_name"
        onChange={props.changeHandler}
        value={props.last_name}
        placeholder="last Name..."
      />
      <input
        type="text"
        name="phone_number"
        onChange={props.changeHandler}
        value={props.phone_number}
        placeholder="Phone No..."
      />
      <button type="click" onClick={props.save}>
        save
      </button>
    </div>
  );
};
export default InputDetails;
