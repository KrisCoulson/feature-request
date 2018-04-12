import React, { Component } from 'react';
import Sidebar from '../layout/components/Sidebar';
import MainContent from '../layout/components/MainContent';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="container-center">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    );
  }
}

export default App;
