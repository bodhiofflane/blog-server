import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookeiParser from 'cookie-parser';

// Configuration
import { PORT } from './configs/app.config.js';
import dbConnectionString from './configs/db.config.js';

import postsRouter from './routes/posts.route.js';
import authRouter from './routes/auth.route.js';
import commentsRouter from './routes/comments.route.js';
import usersRouter from './routes/users.route.js';


// Initialization
const app = express();
const corsSettings = cors();
const serveStatic = express.static('uploads'); // Дир. оносительно корня приложения, откуда берем статику 
const jsonParser = express.json();
const formParser = express.urlencoded({extended: false});
const fromDataParser = fileUpload();

// Common middlewares
app.use(corsSettings);
app.use(cookeiParser());
app.use('/uploads', serveStatic); // Путь по которому будем возвращать статику
app.use(jsonParser);
app.use(formParser);
app.use(fromDataParser);


// Routes
app.use('/api/auth', authRouter);
app.use('/api/post', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);

// Auto start app
(async () => {
  try {
    await mongoose.connect(dbConnectionString);
    //await mongoose.connect(`mongodb://localhost:27017/my-blog-local`);
    console.log('DB connection');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
})();

// End app
process.on('SIGINT', async () => {
  try {
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
});


