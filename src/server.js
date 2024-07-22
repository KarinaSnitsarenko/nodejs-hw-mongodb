import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS, UPLOAD_DIR } from './contacts/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export const setupServer = () => {
  const app = express();

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use(cors());

  app.use(express.json());

  app.use(cookieParser());

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));

   app.use('/uploads', express.static(UPLOAD_DIR));
   app.use('/api-docs', swaggerDocs());

  const PORT = env(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
