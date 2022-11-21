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

  console.log('validDataType ========= ', validDataType);
  // process.env.DOMAIN_NAME+`/search/repositories?q=created:<2019-01-10+language:javascript+language:typescrip&sort=stars&order=desct&per_page=50&page=1`
  // process.env.DOMAIN_NAME+`/search/repositories?q=created:${dateComparison}${startingDate}+${languages}&sort=stars&order=${order}&per_page=${limit}&page=${page}`
  if (!validDataType) {
    res.status(400).send({ error: ERROR_MESSAGES.INVALID_PRAMS_FORMAT });
  } else {
    next();
  }
};
