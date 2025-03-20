import Redis from 'ioredis';

export const redis = new Redis({
  host: 'localhost',
  port: 6379,
  //   password: 'your_password',
});

// Test connection
redis
  .ping()
  .then((response) => console.log('Redis connected:', response))
  .catch((err) => console.error('Redis error:', err));

export default redis;
