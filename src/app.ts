import express from 'express';
import axios from 'axios';
import path from'path';
import { apiRouter } from './apiRouter.js'

const app = express();
const port = 3051;

app.use(express.json())
app.use("/api", apiRouter)
app.use('/', express.static(path.join(path.dirname(__dirname) + '/client/dist')));

const start = async () => {
    
    try {
        app.listen(port, (err?: any) =>  {
            if (err) {
                return console.error(err);
              }
              return console.log(`server is listening on ${port}`);
        });
    } catch (e) {
        console.log(e)
    }
}

start();
