import { validateRepositoryRequestMiddleware } from '../../core/middlewares/validate-repository-request.middlware';
import * as express from 'express';
import { IndexService } from './index.service';
var router = express.Router();

/* GET home page. */
router.get(
  '/',
  validateRepositoryRequestMiddleware,
  async function (req: express.Request, res: express.Response) {
    return await IndexService.getRepositories(req, res);
  }
);

export default router;
