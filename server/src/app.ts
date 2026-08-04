import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import v1Routes from './routes/v1';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', v1Routes);

app.use(errorHandler);

export default app;
