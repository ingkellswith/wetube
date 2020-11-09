import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
//import { userRouter } from "./userRouter";
//default로 router를 export하지 않고 그냥 export 했기 때문에 {}사용
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import flash from "express-flash";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import "./passport";
import apiRouter from "./routers/apiRouter";

const app = express();

const CookieStore = MongoStore(session);

//console.log(process.env.COOKIE_SECRET);

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
//app.use("/uploads", express.static("uploads"));
//directory에서 파일을 보내는 역할을 하는 express.static()
app.use("/static", express.static(path.join(__dirname, "static")));
//위는 원래 app.use("/static", express.static("static"));였음 근데 package.json있는 곳이
//기본 경로이기 때문에 경로를 src/static으로 경로를 바꿔준것
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  return next();
}); //video볼 때 helmet보안 걸려서 헤더 써줘야함.

app.use("/", globalRouter); //'/'는 routes.home과 같음
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;

/*const handleHome = (req, res) => res.send("Hello from my ass");
const handleProfile = (req, res) => res.send("You are on my profile");
app.get("/", handleHome);
app.get("/profile", handleProfile);*/
//const middleware = (req, res, next) => res.send("kill connection");
//app.use(middleware);
