import rateLimit from "express-rate-limit";
import { ERROR_MESSAGES } from "../../common/constnats/common.constants";

export class RateLimiterMiddleware {
  public static init(
    app: any,
  ) {
    app.use(
      rateLimit({
        windowMs: !isNaN(Number(process.env.MAX_REQUESTS_TIME_PERIOD)) ? Number(process.env.MAX_REQUESTS_TIME_PERIOD) : 900000, // 15 minutes
        max: !isNaN(Number(process.env.MAX_ALLOWED_REQUESTS_PER_IP)) ? Number(process.env.MAX_ALLOWED_REQUESTS_PER_IP) : 20, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: {error: ERROR_MESSAGES.TOO_MANY_REQUEST},
      })
    );
  }
}
