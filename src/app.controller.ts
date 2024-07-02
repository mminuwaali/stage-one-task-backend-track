import { Request } from 'express';
import { AppService } from './app.service';
import { Controller, Get, Query, Req } from '@nestjs/common';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("hello")
  async getHello(@Req() request: Request, @Query("visitor_name") visitorName: string) {
    request.ip

    return this.appService.getHello(request.ip, visitorName);
  }
}
