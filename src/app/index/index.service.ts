import { formatDateComparison } from './../../common/utilities/common.utilities';
import { Request, Response } from 'express';
import {
  formatLanguages,
  RETURN_BAD_REQUEST_RESPONSE,
  RETURN_SUCCESS_REQUEST_RESPONSE,
} from '../../common/utilities/common.utilities';
import { ERROR_MESSAGES } from '../../common/constnats/common.constants';
import { RepositoryQueryEntity } from '@root/src/common/entity/repository.entity';
import axios from 'axios';

export class IndexService {
  static async getRepositories(req: Request, res: Response) {
    const DOMAIN_NAME = process.env.DOMAIN_NAME;
    let { startingDate, dateComparison, languages, order, limit, page } =
      req.query as unknown as RepositoryQueryEntity;

    dateComparison = formatDateComparison(dateComparison);
    limit = Number(limit);
    page = Number(page);

    const updatedLanguages = formatLanguages(languages);
    try {
      console.log('request receieved: ' + new Date().toUTCString());
      let result = await axios.get(
        DOMAIN_NAME +
          `search/repositories?q=created:${dateComparison}${startingDate}+${updatedLanguages}&sort=stars&order=${order}&per_page=${limit}&page=${page}`
      );
      RETURN_SUCCESS_REQUEST_RESPONSE(res, result.data);
    } catch (error) {
      console.log('request failed: ' + error);
      RETURN_BAD_REQUEST_RESPONSE(
        res,
        `${startingDate} ${ERROR_MESSAGES.ROUTE_NOT_FOUND}`
      );
    }
  }
}
