import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Todo } from './constants/types';

@Controller()
export class AppController {
  constructor(@Inject(AppService) private readonly appService: AppService) {}

  @Get('hello')
  public getHello(): string {
    return this.appService.getHello();
  }

  @Get('todos')
  public async getTodos(): Promise<Todo[]> {
    return this.appService.getTodos();
  }
}
