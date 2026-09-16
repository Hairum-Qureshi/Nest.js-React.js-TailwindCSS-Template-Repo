import { Injectable } from '@nestjs/common';
import type { GreetingResponse } from '@repo/shared';

@Injectable()
export class AppService {
  getHello(): GreetingResponse {
    return {
      greeting: 'Hello from Nest.js!',
      timestamp: new Date().toISOString(),
    };
  }
}
