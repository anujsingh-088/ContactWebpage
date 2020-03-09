import React from "react";
const OpenContactList = props => {
  return (
    <div>
      <button type="click" onClick={props.openContactList}>
        Contact List
      </button>
    </div>
  );
};
export default OpenContactList;
