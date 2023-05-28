import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Mock } from 'vitest';
import { Todo } from './constants/types';
import { MockConfigService } from './test/__mocks__/mock-config.service';

vi.mock('axios');

describe('App Service', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
        AppService,
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  test('should return hello world', () => {
    // Act
    const actual = service.getHello();

    // Assert
    expect(actual).toEqual('Hello World!');
  });

  test('should fetch todos', async () => {
    // Arrange
    // We are going to create a fake function for the axios.get method which returns our own custom response object
    (axios.get as Mock).mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'mock_title',
          description: 'mock_description',
          completed: false,
        },
      ] as Todo[],
    });

    // Act
    const actual = await service.getTodos();

    // Assert
    expect(actual).toEqual([
      {
        id: 1,
        title: 'mock_title',
        description: 'mock_description',
        completed: false,
      },
    ] as Todo[]);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('API_URL/todos');

    // At the end of our test, we basically just reset the state of the mock so that it doesn't break other tests...
    (axios.get as Mock).mockClear();
  });
});
