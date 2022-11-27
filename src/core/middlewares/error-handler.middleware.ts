import { RETURN_BAD_REQUEST_RESPONSE } from '../../common/utilities/common.utilities';
import { ErrorRequestHandler } from 'express';
import {
  ERROR_MESSAGES,
  STATUS_CODES,
} from '../../common/constnats/common.constants';

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: any,
  req,
  res,
  next
) => {
  console.log('error', err);
  RETURN_BAD_REQUEST_RESPONSE(
    res,
    ERROR_MESSAGES.ROUTE_NOT_FOUND,
    err.status || STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
  );
  next();
};
