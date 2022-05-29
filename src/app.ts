import express from 'express';
import appRoutes from './routes/appRoutes';
import { catchError } from './middlewares/catchError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type from './type';
// import cors from 'cors';

const app = express();
var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', appRoutes);

app.use(catchError);

export default app;
