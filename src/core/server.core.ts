import cluster from 'cluster';
import * as os from 'os';
import ServerConfiguration from '../common/configurations/server.configuration';

export class Server {
  constructor() {}
  public bootstarp() {
    if (process.env.NODE_ENV === 'production' && cluster.isPrimary) {
      console.log('dev', `Master ${process.pid} started`); // this log will be replaced by logger function
      for (let i = 0; i < this.numberOfCores; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker) => {
        console.log('dev', `worker ${worker.process.pid} stopped working`); // this log will be replaced by logger function
        cluster.fork();
      });
      cluster.on('fork', (worker) => {
        console.log('dev', `Worker ${worker.process.pid} started`); // this log will be replaced by logger function
      });
    } else {
      const server = new ServerConfiguration();
      server.init();
    }
  }

  private get numberOfCores() {
    return os.cpus().length;
  }
}
