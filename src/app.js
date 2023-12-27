// Imprt packages
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import MongoDB from "./database/connect.mogodb.js";
import route from "./routes/index.js";
import passport from "passport";
import session from "express-session";
import "./helpers/scheduler.js";
import "./auth/passport.auth.js";
import config from "./configs/index.js";

// Init app
const app = express();

//Use middleware
app.use(cors({ origin: config.auth.clientUrl, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.set("trust proxy", 1);
app.use(
  session({
    secret: config.app.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Connect database
MongoDB.getInstance();

//Use router
app.use(route);

export default app;
