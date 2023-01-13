import { startApp} from "./db";
import app from "./app";
//Start our server and tests!
const port = process.env.PORT || 3000;
startApp(app, port);
