import React from 'react';
import axios from 'axios';
import moment from 'moment';


const getPosts = () => {
  return axios.get('http://localhost:3001/post').then(res => res.data);
}

class MainContent extends React.Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    getPosts().then(data => this.setState({ posts: data.posts }));
  }

  render() {
    return (
      <div className="main-content">
        {this.state.posts.map(post => (
          <div key={post._id} className="post">
            <h4 className="post-title">{post.title}</h4>
            <div className="post-description">{post.description}</div>
            <div className="post-created-at">{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
          </div>
        ))}
        <button onClick={this.getPosts}>Refresh Posts</button>
      </div>
    );
  }
}


export default MainContent;
