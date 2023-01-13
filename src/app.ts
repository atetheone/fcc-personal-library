import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { indexRouter } from "./routes";
import { apiRouter } from "./routes/api";
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //USED FOR FCC TESTING PURPOSES ONLY!

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Index page (static HTML)
app.use(indexRouter);;

//Routing for API 
app.use(apiRouter)
    
//404 Not Found Middleware
app.use(function(req: Request, res: Response, next: NextFunction) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

export default app; //for unit/functional testing
