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
import config from "./configs/index.js";
import { v2 as cloudinary } from "cloudinary";
import "./helpers/scheduler.helper.js";
import "./auth/passport.auth.js";

// Init app
const app = express();

//Use middleware
app.use(cors({ origin: config.auth.clientUrl, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(
  session({
    secret: config.app.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Config cloudinary for storage
cloudinary.config(config.cloudinary);

//Connect database
MongoDB.getInstance();

//Use router
app.use(route);

export default app;
