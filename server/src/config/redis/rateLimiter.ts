import { Request, Response, NextFunction } from 'express';
import redis from './redis';

// Hàm rate limiting
async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = req.ip; // Sử dụng IP làm định danh người dùng
  const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (giây)
  const windowSize = 60; // Khoảng thời gian (ví dụ: 60 giây)
  const maxRequests = 10; // Số lượng yêu cầu tối đa trong khoảng thời gian

  const key: string = `rate_limit:${userId}`; // Key lưu trữ trong Redis

  try {
    // Lấy danh sách các yêu cầu trong khoảng thời gian
    const requests: string[] = await redis.lrange(key, 0, -1);

    // Lọc các yêu cầu cũ hơn windowSize
    const recentRequests: string[] = requests.filter((timestamp: string) => {
      return currentTime - parseInt(timestamp) <= windowSize;
    });

    // Kiểm tra số lượng yêu cầu
    if (recentRequests.length >= maxRequests) {
      res.status(429).json({ message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.' });
      return;
    }

    // Thêm thời gian hiện tại vào danh sách
    await redis.lpush(key, currentTime.toString());
    await redis.expire(key, windowSize); // Đặt thời gian hết hạn cho key

    next(); // Cho phép yêu cầu tiếp tục
  } catch (error) {
    console.error('Lỗi Redis:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
}

export default rateLimiter;
