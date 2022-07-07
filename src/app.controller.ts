import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthcheck')
  getHealthcheck(): string {
    return this.appService.getHealthcheck();
  }

  @Post('scan')
  async scan() {
    return await this.appService.scan();
  }
}
