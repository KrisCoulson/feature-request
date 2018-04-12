import React from 'react';
import axios from 'axios';

const createNewPost = values => {
  axios.post('http://localhost:3001/post', {
    title: values.title,
    description: values.description
  });
};

class Sidebar extends React.Component {
  state = {
    title: '',
    description: ''
  };

  render() {
    return (
      <div className='sidebar'>
        <label>Title</label>
        <input
          placeholder="Title"
          type="text"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
        />
        <button onClick={() => {
          createNewPost(this.state)
          this.setState({ title: '', description: '' });
        }}>New Post</button>
      </div>
    );
  }
}

export default Sidebar;
