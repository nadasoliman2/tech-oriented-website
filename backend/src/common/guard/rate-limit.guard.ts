import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request } from 'express';

const requestCounts = new Map<string, { count: number; expiresAt: number }>();

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly limit = 5; // Max 5 requests
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes window

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const clientIp =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      'unknown-ip';

    const key = `${req.path}_${clientIp}`;
    const now = Date.now();

    const record = requestCounts.get(key);

    if (!record || now > record.expiresAt) {
      requestCounts.set(key, {
        count: 1,
        expiresAt: now + this.windowMs,
      });
      return true;
    }

    if (record.count >= this.limit) {
      throw new HttpException(
        'Too many requests from this IP, please try again after 15 minutes.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    record.count += 1;
    return true;
  }
}
