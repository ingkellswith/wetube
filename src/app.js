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

const CookieStore = MongoStore(session); //서버꺼져도 세션 저장

//console.log(process.env.COOKIE_SECRET);

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
//app.use("/uploads", express.static("uploads"));
//directory에서 파일을 보내는 역할을 하는 express.static()
app.use("/static", express.static(path.join(__dirname, "static")));
//위는 원래 app.use("/static", express.static("static"));였음 근데 package.json있는 곳이
//기본 경로이기 때문에 경로를 src/static으로 경로를 바꿔준것
//exact router가 아닌듯 /static으로 가도 /static/videos/:id같은 파일이 실행되기 때문
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }), //서버꺼져도 세션 저장
  })
);
app.use(flash());

app.use(passport.initialize()); //passport.js에서 passport의 startegy와 serealization설정을 해준 후 init
app.use(passport.session()); //passport는 쿠키와 세션이 필요하다

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

//package.json에서 dev:assets에서 -w로 watch mode로 설정했기 때문에 vsc에서 저장만 해도 로컬 호스트
//에서 새로고침만 해도 변경내용이 반영됨
//"prebuild": "rd /s \"build\"", package.json에서 heroku로 deploy할 때 오류나서 잠깐 뺐음
