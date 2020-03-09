import React from "react";
import "./contactList.css";
const ContactList = props => {
  return (
    <div>
      <p className="contactList" onClick={props.openContact}>
        {props.index} {props.contactList}
      </p>
    </div>
  );
};
export default ContactList;
