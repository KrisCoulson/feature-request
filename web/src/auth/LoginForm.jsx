import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';

const login = values => {
  return axios.post('/login', values, { withCredentials: true });
};

class LoginForm extends React.Component {
  email = React.createRef();
  password = React.createRef();

  state = {
    redirectToReferrer: false,
  }

  handleSubmit = e => {
    e.preventDefault();
    console.dir(e.target)
    const values = {
      email: this.email.current.value,
      password: this.password.current.value
    };

    login(values).then(res => {
      isAuthenticated(res.data.loggedIn);
      this.setState({ redirectToReferrer: true })
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

     if (redirectToReferrer) {
       return <Redirect to={from} />;
     }

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
