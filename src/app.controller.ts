import { AppService } from './app.service';
import { Controller, Get, Query, Ip } from '@nestjs/common';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("hello")
  async getHello(@Query("visitor_name") visitorName: string, @Ip() ip: string) {
    console.log(ip, "client ip address");
    return this.appService.getHello(ip, visitorName);
  }
}
