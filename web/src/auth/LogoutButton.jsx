import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';
import './styles.css';

const logout = h => {
  return axios
    .delete('/logout', { withCredentials: true })
    .then(res => {
      isAuthenticated(res.data.loggedIn);
      h.push('/login');
    });
};

const LogoutButton = ({ history }) => (
  <button className="logout-button" type="button" onClick={() => logout(history)}>
    Logout
  </button>
);

export default withRouter(LogoutButton);
