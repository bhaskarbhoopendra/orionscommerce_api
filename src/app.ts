import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";
import morgan from "morgan";
import clc from "cli-color";
import cors from "cors";
import multer from "multer";
import { fileFilter, fileStorage } from "./util/multer";

class App {
  public app = express.application;
  public router = express.Router();

  constructor(controllers: Controller[]) {
    this.app = express();
    this.app.use(cors());
    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeErrorHandling();
    this.initializeController(controllers);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(clc.yellow(`Server is running on ${process.env.PORT}`));
    });
  }

  private initializeController(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeMiddleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
    this.app.use(express.static(`${__dirname}/public`));
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  private connectToDatabase() {
    const { DATABASE_URI } = process.env;
    mongoose
      .connect(`${DATABASE_URI}`)
      .then(() => {
        console.log(clc.green.italic("Connected to db"));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default App;
