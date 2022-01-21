import { CheckJwtMiddleware } from './check-jwt.middleware';

describe('CheckJwtMiddleware', () => {
  it('should be defined', () => {
    expect(new CheckJwtMiddleware()).toBeDefined();
  });
});
