import React, { Component } from "react";
import "./App.css";
import isMobilePhone from "validator/lib/isMobilePhone";

import CreateContact from "./components/createContacts/createContact";
import InputDetails from "./components/createContacts/inputDetails";
import OpenContactList from "./components/contactList/openContactList";
import ContactList from "./components/contactList/contactList";
import SendMessage from "./components/contactList/sendMessage";
import OpenSentMessage from "./components/messageSent/openSentMessage";
import MessageList from "./components/messageSent/messageList";
class App extends Component {
  state = {
    id: "",
    messages: [],
    contacts: [],
    contact: [],
    input: false,
    first_name: this.props.first_name,
    last_name: this.props.last_name,
    phone_number: this.props.phone_number,
    openContactList: false,
    openSentMessageList: false,
    details: {
      first_name: "",
      last_name: "",
      phone_number: ""
    },
    message: "",
    contact_info: false
  };
  createContact = () => {
    const toggleinput = this.state.input;
    this.setState({
      input: !toggleinput,
      openContactList: false,
      contact_info: false,
      openSentMessageList: false
    });
  };
  saveDetails = e => {
    //console.log("name", this.state.first_name);

    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone_number: this.state.phone_number
    };
    let isValid_phone =
      this.state.phone_number && isMobilePhone(this.state.phone_number);
    let isValid_first_name =
      this.state.first_name &&
      this.state.first_name.length >= 3 &&
      this.state.first_name.length < 20;
    let isValid_last_name =
      this.state.last_name &&
      this.state.last_name.length >= 3 &&
      this.state.last_name.length < 20;
    console.log(isValid_first_name);
    console.log(isValid_last_name);
    console.log(isValid_phone);
    if (isValid_phone && isValid_first_name && isValid_last_name) {
      console.log(data);
      fetch("http://127.0.0.1:8000/api/contacts/", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
          this.setState({
            input: false
          });
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }

    if (!isValid_first_name) alert("first name length must be b/w 3 to 20");
    if (!isValid_last_name) alert("last name length must be b/w 3 to 20");
    if (!isValid_phone) alert("enter valid Phone Number");
  };
  handleChange = e => {
    //e.preventDefault(e);
    //console.log(e.target.name.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showContacts = () => {
    const showContactList = this.state.openContactList;
    console.log(this.state.openContactList);

    this.setState({
      openContactList: !showContactList,
      input: false,
      openSentMessageList: false
    });
    console.log(this.state.openContactList);

    fetch("http://127.0.0.1:8000/api/contacts/", {
      method: "GET" // or 'PUT'
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        this.setState({
          contacts: data,
          contact_info: false,
          input: false,
          openSentMessageList: false
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  showSingleContact = (e, index) => {
    let details = {};
    fetch(`http://127.0.0.1:8000/api/contacts/${index}/info/`, {
      method: "GET" // or 'PUT'
    })
      .then(response => response.json())
      .then(data => {
        details.first_name = data.First_name;
        details.last_name = data.Last_name;
        details.phone_number = data.Phone_number;
        this.setState({
          id: index,
          contact: data,
          details: details,
          contact_info: true
        });
        console.log(this.state.details);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  addMessage = e => {
    e.preventDefault(e);
    this.setState({
      message: e.target.value
    });
  };
  sendMessage = (e, id) => {
    console.log(id);
    const data = {
      name: this.state.details.first_name + " " + this.state.details.last_name,
      phone_number: this.state.details.phone_number,
      message: this.state.message
    };
    console.log(data);
    let isValid_message =
      this.state.message &&
      this.state.message.length >= 5 &&
      this.state.message.length <= 100;
    if (isValid_message) {
      fetch(`http://127.0.0.1:8000/api/messages/${id}/send/`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            openContactList: false,
            contact_info: false,
            input: false,
            openSentMessageList: false,
            message: ""
          });
          console.log("Success:", data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
    if (!isValid_message) alert("Message length must be b/w 5 to 100");
  };
  sentMessageList = () => {
    const showMessageList = this.state.openSentMessageList;

    this.setState({
      openSentMessageList: !showMessageList
    });
    console.log(this.state.openSentMessageList);

    fetch(`http://127.0.0.1:8000/api/messages/`, {
      method: "GET" // or 'PUT'
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        this.setState({
          messages: data,
          input: false,
          openContactList: false
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  render() {
    let messages = this.state.messages.map(message => {
      return (
        <MessageList
          name={message.first_name + " " + message.last_name}
          time={message.time}
          sentMessage={message.message}
        />
      );
    });

    let contacts = this.state.contacts.map((contact, key) => {
      return (
        <ContactList
          index={key + 1}
          contactList={contact.first_name + " " + contact.last_name}
          openContact={e => this.showSingleContact(e, contact.id)}
        />
      );
    });
    let showInputs = null;
    this.state.input
      ? (showInputs = (
          <InputDetails
            changeHandler={this.handleChange}
            first_name={this.state.first_name}
            last_name={this.state.last_name}
            phone_number={this.state.phone_number}
            save={this.saveDetails}
          />
        ))
      : (showInputs = null);
    return (
      <div className=".container">
        <h1 className="App">Message App</h1>
        <OpenContactList openContactList={this.showContacts} />
        {this.state.openContactList ? contacts : null}
        {this.state.contact_info ? (
          <SendMessage
            name={
              this.state.details.first_name + " " + this.state.details.last_name
            }
            phone_no={this.state.details.phone_number}
            message={this.state.message}
            changeMessage={this.addMessage}
            send={e => this.sendMessage(e, this.state.id)}
          />
        ) : null}
        <OpenSentMessage openSentMessage={this.sentMessageList} />
        {this.state.openSentMessageList ? messages : null}
        <CreateContact click={this.createContact} />
        {showInputs}
      </div>
    );
  }
}

export default App;
