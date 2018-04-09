import mongoose from 'mongoose';

const postSchema  = mongoose.Schema({
  title: String,
  description: String,
  upvote_count: Number,
})


export default mongoose.model('Post', postSchema);
