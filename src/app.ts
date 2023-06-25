import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import keyManager from './router/keyManager';
import authRouter from './router/auth';
import borrowedKey from './router/borrowedKey';
import keyHistory from './router/keyHistory';
import dbConnect from "../config/mongo";

const PORT = process.env.PORT || 3000;
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//ruta statica
app.use('/uploads', express.static('./src/uploads'));

//Carga de archivo
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}));

//Base de datos
dbConnect();

//Routes
app.use('/api', authRouter);
app.use('/api/keys', keyManager);
app.use('/api/borrowedKeys', borrowedKey);
app.use('/api/keyHistory', keyHistory);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});