import { RETURN_BAD_REQUEST_RESPONSE } from './../../common/utilities/common.utilities';
import {
  ERROR_MESSAGES,
  STATUS_CODES,
} from '../../common/constnats/common.constants';
import { Request, Response, NextFunction } from 'express';
import { RepositoryQueryEntity } from '../../common/entity/repository.entity';

export const validateRepositoryRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { startingDate, dateComparison, languages, order, limit, page } =
    req.query as unknown as RepositoryQueryEntity;
  let validDataType = true;
  //assuming the values will be present in all scenarios
  if (
    typeof startingDate !== 'string' ||
    typeof dateComparison !== 'string' ||
    typeof languages !== 'string' ||
    typeof limit !== 'string' ||
    typeof page !== 'string' ||
    typeof order !== 'string'
  ) {
    validDataType = false;
  }
  if (!validDataType) {
    RETURN_BAD_REQUEST_RESPONSE(
      res,
      ERROR_MESSAGES.INVALID_PRAMS_FORMAT,
      STATUS_CODES.BAD_REQUEST_CODE
    );
  } else {
    next();
  }
};
