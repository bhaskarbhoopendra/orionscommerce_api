"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const morgan_1 = __importDefault(require("morgan"));
const cli_color_1 = __importDefault(require("cli-color"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(controllers) {
        this.app = express_1.default.application;
        this.router = express_1.default.Router();
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeErrorHandling();
        this.initializeController(controllers);
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(cli_color_1.default.yellow(`Server is running on ${process.env.PORT}`));
        });
    }
    initializeController(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    initializeMiddleware() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms"));
        this.app.use(express_1.default.static(`${__dirname}/public`));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    connectToDatabase() {
        const { DATABASE_URI } = process.env;
        mongoose_1.default
            .connect(`${DATABASE_URI}`)
            .then(() => {
            console.log(cli_color_1.default.green.italic("Connected to db"));
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
exports.default = App;
