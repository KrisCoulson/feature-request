import React from 'react';
import axios from 'axios';

const createNewPost = values => {
  axios.post('http://localhost:3001/post', {
    title: values.title,
    description: values.description
  });
};
const getPosts = values => {
  axios.get('http://localhost:3001/post').then(res => console.log(res.data))
};

class Sidebar extends React.Component {
  state = {
    title: '',
    description: ''
  };

  render() {
    return (
      <div
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}>
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
        <button onClick={() => createNewPost(this.state)}>New Post</button>
        <button onClick={() => getPosts()}>Get Posts</button>
      </div>
    );
  }
}

export default Sidebar;
