import cors from 'cors';

export class CorsMiddleware {
  public static init(
    app: any,
  ) {
    const corsOptions = {
      optionsSuccessStatus: 200,
      origin: process.env.CORS_ORIGIN || '',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: [
        'Set-Cookie',
      ],
    };
    app.use(cors(corsOptions));
  }
}
