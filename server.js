import express from 'express'
import { APP_PORT,DB_URL } from './config/index.js';
import router from './Router/router.js';
import errorHandler from './Middleware/errorHandler.js';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose.connect(DB_URL, {useNewUrlParser: true});

const app = express();

app.use(express.json())

app.use(router)

app.use(errorHandler)

app.listen(APP_PORT,()=>{
    console.log("4545 is running...");
});