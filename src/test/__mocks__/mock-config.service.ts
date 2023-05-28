export class MockConfigService {
  public get<T>(key: T | undefined) {
    return key;
  }
}
