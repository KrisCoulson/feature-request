import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';

import Post from './schemas/Post';

const app = new Koa();
const router = new Router();

mongoose.connect('mongodb://localhost:27017/feature-request').then(
  () => {
    console.log('Connected to mongodb.');
  },
  err => {
    console.log('Error connecting to mongodb', err);
  }
);


app.use(bodyparser());
app.use(cors());

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

  ctx.status = 200
  ctx.body = { status: 'success' }
})

router.get('/post', async (ctx) => {
  const posts = await Post.find({});
  console.log(posts);

  ctx.body = { posts }
})

app.use(router.routes());

app.listen(3001);
