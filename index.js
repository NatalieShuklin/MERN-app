import express from "express";
import { PORT, mongoDBurl } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:5555',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-type']
// }));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
});

//router express
app.use('/books', booksRoute);


mongoose
    .connect(mongoDBurl)
    .then(()=>{
        console.log('app connected to db');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
        
    })
    .catch((error)=>{
        console.log(error);
    });
