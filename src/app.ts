import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";
import morgan from "morgan";
import clc from "cli-color";
import multer from "multer";
import { fileFilter, fileStorage } from "./util/multer";

class App {
  public app = express.application;

  constructor(controllers: Controller[]) {
    this.app = express();

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
    // this.app.use(multer({ storage: fileStorage, fileFilter: fileFilter })
    // this.app.use(upload.array());
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
