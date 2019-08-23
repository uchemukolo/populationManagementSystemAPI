import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import population from './routes'

dotenv.config();

const app = express();

const port = parseInt(process.env.PORT, 10) || 9000;

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
}));

app.use('/api/v1/', population);

app.get('*', (request, response) => response.status(200).send({
  message: 'Welcome to Population Management API!!!',
}));


app.listen(port, () => console.log(`server is up and running on localhost: ${port}`));

export default app;