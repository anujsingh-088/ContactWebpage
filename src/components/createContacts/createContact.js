import React from "react";
const CreateContact = props => {
  return (
    <div>
      <button type="click" onClick={props.click}>
        create
      </button>
    </div>
  );
};
export default CreateContact;
