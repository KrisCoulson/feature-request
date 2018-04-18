import React, { Component, Fragment } from 'react';
import Sidebar from '../layout/components/Sidebar';
import MainContent from '../layout/components/MainContent';
import LoginForm from '../auth/LoginForm';
import isAuthenticated from '../utils/isAuthenticated';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const Main = () => (
  <Fragment>
    <Sidebar />
    <MainContent />
  </Fragment>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
       isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container-center">
            <PrivateRoute exact path="/" component={Main} />
            <Route path="/login" component={LoginForm} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
