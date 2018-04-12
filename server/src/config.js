export default {
  name: 'FEATURE_REQUEST_API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  base_url: process.env.BASE_URL || 'http://localhost:3001',
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/feature-request',
  }
}
