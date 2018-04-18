import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../user/model';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    (email, password, done) => {
      User.findOne({ email }, async (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        // Check if the users password matches the saved password.
        if (!await user.verifyPassword(password)) {
          // if passwords don't match we return false
          return done(null, false);
        }
        // if passwords do match we return the user.
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id)
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, user)
  });
});

export default passport;
