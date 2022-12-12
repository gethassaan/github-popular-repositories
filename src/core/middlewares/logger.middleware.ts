import { RequestHandler } from 'express';

export const requestLoggerMiddleware: RequestHandler = (
  req,
  res,
  next
): void => {
  console.log('request receieved: ' + new Date().toUTCString());
  next();
};
