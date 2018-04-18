import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import passport from './auth/auth';

import config from './config';
import session from 'koa-session';
import Post from './post/model';
import User from './user/model';


const app = new Koa();
const router = new Router();

mongoose.connect(config.db.uri).then(
  () => {
    console.log('Connected to mongodb.');
  },
  err => {
    console.log('Error connecting to mongodb', err);
  }
);

const authenticated = function(ctx, next) {
  console.log('ctx is : ', ctx.isAuthenticated())
  if (ctx.isAuthenticated()) {
    return next()
  }
  console.log('hugeeeee error not authed')
};


app.keys = ['secret'];
app.use(session({ key: 'f_r_login' }, app))
app.use(bodyparser());

// To make set-cookie headers store the cookies you must send in credentials
// and have cors return credentials so preflight options request passes
app.use(cors({
  credentials: true,
}));

app.use(logger());

// authentication
app.use(passport.initialize());
app.use(passport.session());

router.post('/login', passport.authenticate('local'), (ctx) => {
  console.log('session', ctx.session)
  console.log('successfully logged in.');
  ctx.cookies.set('loggedIn', true, {httpOnly: false});

  console.log(ctx.req.user)
  const { password, ...rest } = ctx.req.user
  ctx.body = { loggedIn: true , user: ctx.req.user }
});

router.delete('/logout', authenticated, (ctx) => {
  ctx.logout()
  ctx.body = { loggedIn: false , user: ctx.req.user }
});

router.post('/register', async (ctx) => {
  const {email, password} = ctx.request.body;
  const user = await User.create({
    firstName: 'kris',
    lastName: 'coulson',
    email,
    password,
  });
  ctx.body = { status: 'success' }
})

router.use(['/post'], authenticated);

router.post('/post', async (ctx) => {
  const {title, description} = ctx.request.body;
  const post = await Post.create({
    title,
    description,
    upvote_count: 1,
  });
  console.log(post);
  console.log(post.createdAt);
  ctx.status = 200
  ctx.body = { status: 'success' }
})

router.get('/post', async (ctx) => {
  const posts = await Post.find({});
  ctx.body = { posts }
})

router.get('/post/:id', async (ctx) => {
  const post = await Post.findOne({ _id: ctx.params._id });
  console.log(post.createdAt)
  ctx.body = { post }
})

app.use(router.routes());

app.listen(config.port);
