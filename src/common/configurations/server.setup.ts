import cookieParser from 'cookie-parser';
import * as express from 'express';
import createError from 'http-errors';
import indexRouter from '../../app/index/index.routes';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import {
  rateLimiterMiddleware,
  corsMiddleware,
  requestLoggerMiddleware,
  errorHandlerMiddleware,
} from '../../core/middlewares';

export function server() {
  const app = express.default();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  /**
   * Middleware: Helmet is a collection of 11 smaller middleware functions that set HTTP response headers.
   */

  app.use(helmet());

  /**
   * Middleware: Compress response bodies for all request
   */

  app.use(compression());

  /**
   * Middleware: protect against HTTP Parameter Pollution attacks
   */

  app.use(hpp());

  /**
   * Middleware: Used to limit repeated requests to public APIs and/or endpoints.
   */

  rateLimiterMiddleware(app), // these variables will be moved to the enviornment file
    /**
     * Middleware: protect against cross-origin HTTP requests.
     */

    corsMiddleware(app); // these variables will be moved to the enviornment file

  app.use(requestLoggerMiddleware);
  app.use('/', indexRouter);
  // catch 404 and forward to error handler
  app.use(function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    next(createError(404));
  });

  // error handler
  app.use(errorHandlerMiddleware);
  /**
   * Create HTTP server.
   */

  return http.createServer(app);
}
