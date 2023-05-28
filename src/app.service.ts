import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { EnvironmentVariables } from '@/constants/types';

@Injectable()
export class AppService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  public getHello(): string {
    return 'Hello World!';
  }

  // Gets todos from an API
  public async getTodos(): Promise<any> {
    const response = await axios.get(
      `${this.configService.get<string>('API_URL')}/todos`,
    );

    return response.data;
  }
}
