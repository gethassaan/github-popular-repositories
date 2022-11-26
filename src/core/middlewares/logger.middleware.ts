import { NextFunction, RequestHandler } from 'express';

type requestLoggerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const requestLogger: RequestHandler = (req, res, next): void => {
  console.log('request receieved: ' + new Date().toUTCString());
  next();
};
