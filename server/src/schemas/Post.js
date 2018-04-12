import mongoose from 'mongoose';

const postSchema  = mongoose.Schema({
  title: String,
  description: String,
  upvote_count: { type: Number, default: 1 }
})


export default mongoose.model('Post', postSchema);
