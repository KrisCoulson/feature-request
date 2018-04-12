import mongoose from 'mongoose';

const PostSchema  = mongoose.Schema({
  title: { type: String, default: '', trim: true },
  description: String,
  upvote_count: { type: Number, default: 1 }
}, {
  timestamps: true,
})

export default mongoose.model('Post', PostSchema);
