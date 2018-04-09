import React, { Component } from 'react';
import Sidebar from '../layout/components/Sidebar';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="container-center">
          <Sidebar />
        </div>
      </div>
    );
  }
}

export default App;
