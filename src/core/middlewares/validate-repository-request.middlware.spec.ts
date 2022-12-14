import { NextFunction } from 'express';
import { validateRepositoryRequestMiddleware } from './validate-repository-request.middlware';
describe('Validate Repository Request', () => {
  /**
   * Mocked Express Request object
   */

  let mockRequest: any;
  let mockResponse: any;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      query: {
        startingDate: 'test',
        dateComparison: 'test',
        languages: 'test,test',
        order: 'test',
        limit: 'test',
        page: 'test',
      },
    } as unknown as Request;
    mockResponse = {
      json: jest.fn(),
    };
  });

  it('checkMandatoryQueryParams', () => {
    // @ts-ignore
    validateRepositoryRequestMiddleware(
      mockRequest,
      mockResponse,
      nextFunction
    );
    expect(nextFunction).toHaveBeenCalled();
  });
});
