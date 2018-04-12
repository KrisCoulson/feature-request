import React from 'react';
import axios from 'axios';

const login = values => {
  axios.post('http://localhost:3001/login', values);
};

class LoginForm extends React.Component {

  email = React.createRef();
  password = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      email: this.email.current.value,
      password: this.password.current.value,
    }

    login(values);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="sidebar">
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


export default LoginForm;
