import "dotenv/config";
import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly ipinfoApiKey = process.env.IPINFO_API_KEY;
  private readonly weatherbitApiKey = process.env.WEATHERBIT_API_KEY;

  async getHello(client_ip: any, name: string) {
    const locationData = await this.getLocationFromIp(client_ip);
    const { latitude, longitude, city: location = "unknown location" } = locationData;

    const temperature = await this.getTemperatureForCoordinates(latitude, longitude);

    return {
      location, client_ip,
      greeting: `Hello, ${name}!, the temperature is ${temperature} degrees Celsius in ${location}`
    };
  }

  private async getLocationFromIp(ip: string) {
    try {
      const { data } = await axios.get(`https://ipinfo.io/${ip}?token=${this.ipinfoApiKey}`);

      const [latitude, longitude] = data.loc.split(',');
      return { city: data.city, latitude, longitude };
    } catch (error) {
      console.error(error);
    }
  }

  private async getTemperatureForCoordinates(latitude: number, longitude: number) {
    try {
      const { data } = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${this.weatherbitApiKey}`);
      return data.data[0].temp;
    } catch (error) {
      console.error(error);
    }
  }
}
