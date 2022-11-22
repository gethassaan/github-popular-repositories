import { ERROR_MESSAGES } from '../../common/constnats/common.constants';
import { Request, Response, NextFunction } from 'express';
import { RepositoryQueryEntity } from '@root/src/common/entity/repository.entity';

export const validateRepositoryRequest = (
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
    res.status(400).send({ error: ERROR_MESSAGES.INVALID_PRAMS_FORMAT });
  } else {
    next();
  }
};
