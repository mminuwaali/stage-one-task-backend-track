import { AppService } from './app.service';
import { Controller, Get, Query, Ip, Req } from '@nestjs/common';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("hello")
  async getHello(@Query("visitor_name") visitorName: string, @Ip() ip: string, @Req() request: Request) { // @ts-ignore
    console.log(request.clientIp || ip, "client ip address"); // @ts-ignore
    return this.appService.getHello(request.clientIp || ip, visitorName);
  }
}
