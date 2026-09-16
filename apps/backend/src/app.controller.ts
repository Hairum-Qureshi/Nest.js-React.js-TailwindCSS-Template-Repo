import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import type { GreetingResponse } from '@repo/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): GreetingResponse {
    return this.appService.getHello();
  }
}
