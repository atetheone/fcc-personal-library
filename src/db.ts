import { Application } from "express";
import mongoose from "mongoose";
require("dotenv").config();

mongoose.set('strictQuery', true);
export const startApp = async (app: Application, port: number) => {
  const mongo_uri = process.env.DB_URI  || "";
  try {
    await mongoose.connect(mongo_uri);
    console.log("Connected successfully to the DB");
    app.listen(port, () => {
      console.log('Your app is listening on port ' + port);
      // if (process.env.NODE_ENV === 'test') {
      //   console.log('Running Tests...');
        
      // }
    });
  } catch (err) {
    console.log("Unable to connect to the DB");
  }
};