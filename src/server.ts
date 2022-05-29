import config from './config';
import { connect } from './db/data-source';
import app from './app';

(async () => {
  await connect();

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on ${config.port} port`)
  });
})();
