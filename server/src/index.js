import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';

import config from './config';
import Post from './post/model';


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


app.use(bodyparser());
app.use(cors());
app.use(logger());

// logger
app.use(async (ctx, next) => {
const start = new Date();
await next();
const ms = new Date() - start;
console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

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
