import cookieParser from 'cookie-parser';
import * as express from 'express';
import createError from 'http-errors';
import indexRouter from '../../app/index/index.routes';
import http from 'http';
import { CorsMiddleware } from '../../core/middlewares/cors.middleware';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import { RateLimiterMiddleware } from '../../core/middlewares/rate-limiter.middleware';
import { ERROR_MESSAGES, STATUS_CODES } from '../constnats/common.constants';
import { RETURN_BAD_REQUEST_RESPONSE } from '../utilities/common.utilities';
import { requestLogger } from '../../core/middlewares/logger.middleware';

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

  RateLimiterMiddleware.init(app), // these variables will be moved to the enviornment file
    /**
     * Middleware: protect against cross-origin HTTP requests.
     */

    CorsMiddleware.init(app); // these variables will be moved to the enviornment file

  app.use(requestLogger);
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
  app.use(function (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log('error', err);
    RETURN_BAD_REQUEST_RESPONSE(
      res,
      ERROR_MESSAGES.ROUTE_NOT_FOUND,
      err.status || STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
    );
    next();
  });
  /**
   * Create HTTP server.
   */

  return http.createServer(app);
}
