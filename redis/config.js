const redis = require("redis");
const client = redis.createClient(process.env.REDISCLOUD_URL);
client.on('connect', () => console.log('Redis client connected'))
client.on('error', err => console.log('Something went wrong ' + err))
