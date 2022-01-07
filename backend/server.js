import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv  from "dotenv"
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;      // running onport 5000

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;      // gets web address to link to mongoDB backend 
mongoose.connect(uri);
// mongoose.connect(uri, {useNewURLParser: true, useCreateIndex: true});

const connection = mongoose.connection;     // make connection to backend once connected successfully 
connection.once('open', ()=>{
    console.log("MongooseDB database connection established successfully");
})

import usersRouter from './routes/users.js';
import bugsRouter from './routes/bugs.js';
app.use('/users', usersRouter);
app.use('/bugs', bugsRouter);

app.listen(port,()=>{
    console.log(`Server is running on port: ${port} ~ http://localhost:${port}`);
});