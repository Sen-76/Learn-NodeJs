import redis from '@/config/redis/redis';

export class RedisCache {
  static async get(key: string): Promise<any> {
    const cachedData = await redis.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }
  static async set(key: string, data: any, ttl?: number): Promise<void> {
    const stringifiedData = JSON.stringify(data);
    if (ttl) {
      await redis.set(key, stringifiedData, 'EX', ttl);
    } else {
      await redis.set(key, stringifiedData);
    }
  }
  static async invalidate(key: string): Promise<void> {
    await redis.del(key);
  }
  static generateKey(prefix: string, options: any): string {
    return `${prefix}:${JSON.stringify(options)}`;
  }
}
