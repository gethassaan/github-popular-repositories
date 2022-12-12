import 'dotenv/config';
import { server } from './server.setup';
export default class ServerConfiguration {
  get port() {
    return process.env.PORT || '3000';
  }
  constructor() {
    /**
     * Listen on provided port, on all network interfaces.
     */

    server().listen(this.port, () => {
      console.log(`server started listening on port ${this.port}`); // this log will be replaced by logger function
    });
    server().on('error', this.onError);
  }
  /**
   * Event listener for HTTP server "error" event.
   */

  private onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind =
      typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges'); // this log will be replaced by logger function
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use'); // this log will be replaced by logger function
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}
