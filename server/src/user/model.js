import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: String
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', function(next) {
  let password = this.password;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      next();
    });
  });
});

// Can't use arrow functions for schema methods
// Arrow function has no lexical scope so this is undefined
// https://github.com/Automattic/mongoose/issues/5057
UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
