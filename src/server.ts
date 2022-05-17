import "dotenv/config";

import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import UserController from "./user/user.controller";

const app = new App([new UserController(), new AuthenticationController()]);

app.listen();
