"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const express_1 = require("express");
const wrongCredentialsException_1 = __importDefault(require("../excpetions/wrongCredentialsException"));
const user_model_1 = __importDefault(require("../user/user.model"));
const authentication_service_1 = __importDefault(require("./authentication.service"));
const createtoken_1 = __importDefault(require("../util/createtoken"));
const createtoken_2 = __importDefault(require("../util/createtoken"));
class AuthenticationController {
    constructor() {
        this.path = "/auth";
        this.router = (0, express_1.Router)();
        this.authenticationService = new authentication_service_1.default();
        this.user = user_model_1.default;
        this.createToken = createtoken_1.default;
        this.createCookie = createtoken_2.default;
        this.registration = async (request, response, next) => {
            const userData = request.body;
            try {
                const { cookie, user } = await this.authenticationService.register(userData);
                response.setHeader("Set-Cookie", [cookie]);
                response.send(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.loggingIn = async (request, response, next) => {
            const logInData = request.body;
            const user = await this.user.findOne({ email: logInData.email });
            if (user) {
                const isPasswordMatching = await bcrypt.compare(logInData.password, user.get("password", null, { getters: false }));
                if (isPasswordMatching) {
                    const tokenData = this.createToken(user);
                    response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
                    response.send({ tokenData, user });
                }
                else {
                    next(new wrongCredentialsException_1.default());
                }
            }
            else {
                next(new wrongCredentialsException_1.default());
            }
        };
        this.loggingOut = (request, response) => {
            response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
            response.sendStatus(200).send("Logged Out");
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, 
        // validationMiddleware(CreateUserDto),
        this.registration);
        this.router.post(`${this.path}/login`, 
        // validationMiddleware(LogInDto),
        this.loggingIn);
        this.router.post(`${this.path}/logout`, this.loggingOut);
    }
}
exports.default = AuthenticationController;
