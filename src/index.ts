import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connection } from './db';
import { router } from './routes/router';
import multer from 'multer';
import { fileFilter, fileStorage } from './middlewares/multerMiddleware';
import path from 'path';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('filedata')
);
app.use(express.static(path.resolve(__dirname, '../static')));

const start = async () => {
  try {
    await connection.authenticate();
    await connection.sync();
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
