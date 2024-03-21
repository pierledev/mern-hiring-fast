import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import 'express-async-errors';

const app = express();
dotenv.config();

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';

// db
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';
import companiesRouter from './routes/companiesRoutes.js';
import articlesRouter from './routes/articlesRoutes.js';

// middlewares
import {
  authHandlerMiddleware,
  errorHandlerMiddleware,
  notFoundHandlerMiddleware,
} from './middlewares/index.js';

const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authHandlerMiddleware, usersRouter);
app.use('/api/v1/jobs', jobsRouter);
app.use('/api/v1/companies', companiesRouter);
app.use('/api/v1/articles', articlesRouter);

// app.use(express.static(path.join(__dirname, '../client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
// });

app.use(notFoundHandlerMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
