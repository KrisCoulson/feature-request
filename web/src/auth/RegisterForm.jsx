import React from 'react';
import axios from 'axios';

const login = values => {
  axios.post('http://localhost:3001/register', values);
};

class RegisterForm extends React.Component {
  firstName = React.createRef();
  lastName = React.createRef();
  email = React.createRef();
  password = React.createRef();

  handleSubmit = e => {
    e.preventDefault();

    const values = {
      firstName: this.firstName.current.value,
      lastName: this.lastName.current.value,
      email: this.email.current.value,
      password: this.password.current.value
    };

    register(values);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="sidebar">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          ref={this.email}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          ref={this.email}
        />
        <input type="text" placeholder="email" name="email" ref={this.email} />
        <input
          type="text"
          placeholder="password"
          name="password"
          ref={this.password}
        />
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default RegisterForm;
